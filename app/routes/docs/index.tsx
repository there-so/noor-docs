import { LoaderFunction } from "remix";
import { notion } from "~/utils/notion.server";
import { rootPageId } from "~/routes/docs";
import { PageContent } from "~/routes/docs/$pageId";

export const loader: LoaderFunction = async ({ request, params }) => {
  const recordMap = await notion.getPage(rootPageId);
  return { recordMap };
};

export default function Dashboard() {
  return <PageContent />;
}
