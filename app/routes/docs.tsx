import { Link, Outlet, useLoaderData } from "remix";
import { NotionRenderer } from "react-notion-x";
import { notion } from "~/utils/notion.server";

export const rootPageId = "Overview-e65926fae6094b1a962bf9ea44489139";
const navigationPage = "Docs-abe4c4c94e4b440cb937514d8ddeec07";
const docsBlockId = "abe4c4c9-4e4b-440c-b937-514d8ddeec07";

export const loader = async () => {
  const recordMap = await notion.getPage(navigationPage);

  let allLinks = [];

  for (let [key, record] of Object.entries(recordMap.block)) {
    if (
      record.value.type === "page" &&
      record.value.parent_id === docsBlockId
    ) {
      allLinks.push({
        title: record.value.properties?.title[0],
        pageId: record.value.id,
      });
      console.log(record);
      console.log("Page", record.value.properties?.title[0]);
    }
  }

  return { allLinks };
};

export default function Dashboard() {
  const { allLinks } = useLoaderData();

  return (
    <div
      style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}
      className=" p-10 mx-auto"
    >
      <h1 className="font-bold from-neutral-700 text-3xl mb-5 w-20 sm:text-sm">
        Noor
      </h1>

      <div className="flex flex-row">
        <aside className="w-60">
          {allLinks.map((link) => {
            return (
              <Link key={link.id} to={`${mapPageUrl(link.pageId)}`}>
                {link.title}
              </Link>
            );
          })}
        </aside>
        <main className="w-full max-w-4xl">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export const mapPageUrl = (pageId: string) => {
  pageId = (pageId || "").replace(/-/g, "");

  if (rootPageId && pageId === rootPageId) {
    return "/docs";
  } else {
    return `/docs/${pageId}`;
  }
};
