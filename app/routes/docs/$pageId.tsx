import { LoaderFunction } from "remix";
import { PageContent } from "~/components/PageContent";
import { rootPageId } from "~/routes/docs";
import { notion } from "~/utils/notion.server";
import { getStalePageAndUpdate } from "~/utils/pageCache.server";

export const loader: LoaderFunction = async ({ request, params }) => {
  let pageId = params.pageId || rootPageId;
  const recordMap = await getStalePageAndUpdate(pageId);

  return { recordMap };
};

export default function Dashboard() {
  return <PageContent />;
}
