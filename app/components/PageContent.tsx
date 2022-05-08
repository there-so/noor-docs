import { NotionRenderer } from "react-notion-x";
import { useLoaderData } from "remix";
import { Tweet } from "~/components/Tweet";
import { rootPageId } from "~/routes/docs";

export const PageContent = () => {
  const { recordMap } = useLoaderData();

  return (
    <div
      className="bg-white p-4 w-full overflow-scroll"
      style={{ height: "100vh" }}
    >
      <NotionRenderer
        recordMap={recordMap}
        fullPage={true}
        disableHeader={true}
        darkMode={false}
        mapPageUrl={mapPageUrl}
        pageCover={false}
        pageHeader={false}
        showTableOfContents={true}
        components={{
          tweet: Tweet,
        }}
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
