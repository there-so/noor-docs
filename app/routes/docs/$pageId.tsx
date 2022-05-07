import { LoaderFunction, MetaFunction } from "remix";
import { PageContent } from "~/components/PageContent";
import { rootPageId } from "~/routes/docs";
import { notion } from "~/utils/notion.server";
import {
  getPageTitleFromRecordsMap,
  getStalePageAndUpdate,
} from "~/utils/pageCache.server";

export const loader: LoaderFunction = async ({ request, params }) => {
  let pageId = params.pageId || rootPageId;
  const recordMap = await getStalePageAndUpdate(pageId);
  let title = getPageTitleFromRecordsMap(recordMap);

  return { recordMap, title };
};

export const meta: MetaFunction = ({ data }) => {
  if (!data?.title) {
    return {
      title: "Missing Page",
    };
  }

  const { title } = data as { title: string };
  return {
    title: `${title} - Noor Docs`,
  };
};

export default function Dashboard() {
  return <PageContent />;
}
