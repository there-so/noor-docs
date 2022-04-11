import { LoaderFunction, useLoaderData } from "remix";
import { NotionRenderer } from "react-notion-x";
import { notion } from "~/utils/notion.server";
import { rootPageId } from "~/routes/docs";

export const loader: LoaderFunction = async ({ request, params }) => {
  const recordMap = await notion.getPage(params.pageId || rootPageId);

  return { recordMap };
};

export default function Dashboard() {
  return <PageContent />;
}

export const PageContent = () => {
  const { recordMap } = useLoaderData();

  return (
    <div className="bg-white p-4 w-full ">
      <NotionRenderer
        recordMap={recordMap}
        fullPage={true}
        disableHeader={true}
        darkMode={false}
        mapPageUrl={mapPageUrl}
        showTableOfContents={true}
        rootDomain="/posts/"
      />
    </div>
  );
};

export const mapPageUrl = (pageId: string) => {
  pageId = (pageId || "").replace(/-/g, "");

  if (rootPageId && pageId === rootPageId) {
    return "/";
  } else {
    return `/${pageId}`;
  }
};
