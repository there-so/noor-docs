import { NotionRenderer } from "react-notion-x";
import { useLoaderData } from "remix";
import { Tweet } from "~/components/Tweet";
import { mapPageUrl } from "~/routes/docs";
import * as notion from "notion-types";

export const PageContent = () => {
  const { recordMap } = useLoaderData();

  console.log(recordMap);

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
        mapPageUrl={mapPageUrlNotion(recordMap)}
        pageCover={false}
        pageHeader={false}
        showTableOfContents={true}
        // forceCustomImages={true}
        previewImages={true}
        components={{
          Tweet,
        }}
        rootDomain="/posts/"
      />
    </div>
  );
};

export const mapPageUrlNotion =
  (recordMap: notion.ExtendedRecordMap) => (pageId: string) => {
    // Add title to link
    let title = recordMap.block[pageId]?.value.properties?.title[0][0];

    return mapPageUrl(pageId, title || "");
  };

const Image = (props: any) => {
  console.log(props);

  return null;
};
