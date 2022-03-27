import { useLoaderData } from "remix";
import { NotionRenderer } from "react-notion-x";
import { notion } from "~/utils/notion.server";

const rootPageId = "067dd719a912471ea9a3ac10710e7fdf";
const navigationPage = "Docs-abe4c4c94e4b440cb937514d8ddeec07";

export const loader = async () => {
  const recordMap = await notion.getPage("067dd719a912471ea9a3ac10710e7fdf");

  return { recordMap };
};

export default function Dashboard() {
  const { recordMap } = useLoaderData();

  console.log(recordMap);

  let pages = [];

  for (let [key, record] of Object.entries(recordMap.block)) {
    if (record.value.type === "page") {
      console.log("Page", record.value.properties.title[0]);
    }
  }
  return (
    <div
      style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}
      className="container p-10"
    >
      <h1 className="font-bold from-neutral-700 text-3xl mb-5 w-20 sm:text-sm hover:text-blue-600">
        Pick and send
      </h1>

      <aside className="w-80"></aside>
      <main>
        <NotionRenderer
          recordMap={recordMap}
          fullPage={false}
          darkMode={false}
          mapPageUrl={mapPageUrl}
          showTableOfContents={true}
          rootDomain="/posts/"
        />
      </main>
    </div>
  );
}

export const mapPageUrl = (pageId: string) => {
  pageId = (pageId || "").replace(/-/g, "");

  if (rootPageId && pageId === rootPageId) {
    return "/";
  } else {
    return `/${pageId}`;
  }
};
