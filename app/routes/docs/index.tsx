import { LoaderFunction } from "remix";
import { notion } from "~/utils/notion.server";
import { rootPageId } from "~/routes/docs";
import { PageContent } from "~/components/PageContent";
import { getStalePageAndUpdate } from "~/utils/pageCache.server";

export const loader: LoaderFunction = async ({ request, params }) => {
  const recordMap = await getStalePageAndUpdate(rootPageId);
  return { recordMap };
};

export default function Dashboard() {
  return <PageContent />;
}
