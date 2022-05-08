import { json, LoaderFunction, MetaFunction } from "remix";
import { PageContent } from "~/components/PageContent";
import { rootPageId } from "~/routes/docs";
import {
  getPageTitleFromRecordsMap,
  getStalePageAndUpdate,
} from "~/utils/pageCache.server";

export const loader: LoaderFunction = async ({ request, params }) => {
  let pageId = params.pageId || rootPageId;
  const recordMap = await getStalePageAndUpdate(pageId);
  let title = getPageTitleFromRecordsMap(recordMap);

  let headers = { "Cache-Control": "stale-while-revalidate=86400" };

  return json({ recordMap, title }, { headers });
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
