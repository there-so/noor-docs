import type * as notionTypes from "notion-types";
import { notion } from "~/utils/notion.server";
import { Client } from "@notionhq/client";
import { ListBlockChildrenResponse } from "@notionhq/client/build/src/api-endpoints";
import { IterableElement } from "type-fest";

type PageCacheEntry = {
  date: number;
  recordMap: notionTypes.ExtendedRecordMap;
};
type PageCache = {
  pages: Map<string, PageCacheEntry>;
};

let initialPageCache = { pages: new Map() };
export let pageCache: PageCache;

declare global {
  var pageCache: PageCache;
}

if (process.env.NODE_ENV === "production") {
  pageCache = initialPageCache;
} else {
  if (!global.pageCache) {
    global.pageCache = initialPageCache;
  }
  pageCache = global.pageCache;
}

// Functions

export async function getStalePageAndUpdate(pageId: string) {
  let fromCache = pageCache.pages.get(pageId);

  if (!fromCache) {
    let fresh = await notion.getPage(pageId);

    // Save to cache
    pageCache.pages.set(pageId, {
      date: Date.now(),
      recordMap: fresh,
    });

    return fresh;
  }

  // Get from cache and update for later
  notion.getPage(pageId).then((fresh) => {
    // Save to cache
    pageCache.pages.set(pageId, {
      date: Date.now(),
      recordMap: fresh,
    });
  });

  return fromCache.recordMap;
}

export const navigationPage = "abe4c4c94e4b440cb937514d8ddeec07";

type BlockObject = IterableElement<ListBlockChildrenResponse["results"]>;
export type MiniPage = { title: string; id: string; children?: MiniPage[] };

export async function getNavigationLinks() {
  console.log("process.env.NOTION_API_KEY", process.env.NOTION_API_KEY);
  const notionApi = new Client({ auth: process.env.NOTION_API_KEY });

  const blockId = navigationPage;
  const rootPages = await notionApi.blocks.children.list({
    block_id: blockId,
    page_size: 100,
  });

  let pages: MiniPage[] = [];
  let promises = [];

  for (let pageBlock of rootPages.results) {
    let page = notionBlockToPage(pageBlock);
    if (page) {
      pages.push(page);

      // Request nested
      promises.push(
        notionApi.blocks.children.list({
          block_id: page.id,
          // max sub-pages
          page_size: 10,
        })
      );
    }
  }

  // Add children on pages
  let childrenResults = await Promise.all(promises);
  for (let index in childrenResults) {
    pages[index].children = childrenResults[index].results
      .map(notionBlockToPage)
      .filter(Boolean) as MiniPage[];
  }

  return pages;
}

function notionBlockToPage(block: BlockObject): MiniPage | false {
  if (!("type" in block) || block.type !== "child_page") {
    // we'll filter falsy
    return false;
  }

  return {
    id: block.id,
    title: block.child_page.title,
  };
}
