import type * as notionTypes from "notion-types";
import { notion } from "~/utils/notion.server";
import { Client } from "@notionhq/client";
import { ListBlockChildrenResponse } from "@notionhq/client/build/src/api-endpoints";
import { IterableElement } from "type-fest";
import { getPreviewImageMap } from "~/utils/preview.server";

type PageCacheEntry = {
  date: number;
  recordMap: notionTypes.ExtendedRecordMap;
};
type PageCache = {
  pages: Map<string, PageCacheEntry>;
  links: MiniPage[] | null;
  linksDate: number | null;
};

let initialPageCache = { pages: new Map(), links: null, linksDate: null };
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
const previewImagesEnabled = true;

export async function getStalePageAndUpdate(pageId: string) {
  let fromCache = pageCache.pages.get(pageId);

  async function fetchFresh() {
    let recordMap = await notion.getPage(pageId);

    // ref: https://github.com/NotionX/react-notion-x/blob/ce01badd2b544ffe8505cc883f650f9d54d3fa27/examples/full/lib/notion.ts
    if (previewImagesEnabled) {
      // These data never get stale, so we can just use the cached version always
      const previewImageMap = await getPreviewImageMap(recordMap);
      (recordMap as any).preview_images = previewImageMap;
    }
    return recordMap;
  }

  if (!fromCache) {
    let fresh = await fetchFresh();

    // Save to cache
    pageCache.pages.set(pageId, {
      date: Date.now(),
      recordMap: fresh,
    });

    return fresh;
  }

  // 5 minutes cache
  if (fromCache.date < Date.now() - 1000 * 60 * 5) {
    // Get from cache and update for later
    fetchFresh().then((fresh) => {
      // Save to cache
      pageCache.pages.set(pageId, {
        date: Date.now(),
        recordMap: fresh,
      });
    });
  }

  return fromCache.recordMap;
}

export const navigationPage = "abe4c4c94e4b440cb937514d8ddeec07";

type BlockObject = IterableElement<ListBlockChildrenResponse["results"]>;
export type MiniPage = { title: string; id: string; children?: MiniPage[] };

export async function getNavigationLinks(forceUpdate?: boolean) {
  async function getFreshLinks() {
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

  // Cache or fresh
  let thirtyMinutesMs = 1000 * 60 * 30;
  if (
    !forceUpdate &&
    pageCache.links &&
    pageCache.linksDate &&
    pageCache.linksDate > Date.now() - thirtyMinutesMs
  ) {
    // Use cache
    return pageCache.links;
  } else {
    // Get fresh
    let fresh = getFreshLinks().then((fresh) => {
      pageCache.links = fresh;
      pageCache.linksDate = Date.now();
      return fresh;
    });

    // Stale while revalidate
    if (pageCache.links) {
      return pageCache.links;
    } else {
      // MISS
      return fresh;
    }
  }
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

export function getPageTitleFromRecordsMap(
  recordsMap: notionTypes.ExtendedRecordMap
): string | null {
  let title = Object.values(recordsMap.block)[0].value.properties.title;
  if (!title) return null;
  return title;
}
