import { LoaderFunction, redirect } from "remix";
import { rootPageId } from "~/routes/docs";
import { PageContent } from "~/components/PageContent";

export const loader: LoaderFunction = async ({ request, params }) => {
  return redirect(`/docs/${rootPageId}`);
};

export default function Dashboard() {
  return <PageContent />;
}
