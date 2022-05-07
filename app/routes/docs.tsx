import {
  Link,
  LoaderFunction,
  Outlet,
  useLoaderData,
  useLocation,
} from "remix";
import { useState } from "react";
import { getNavigationLinks, MiniPage } from "~/utils/pageCache.server";

export const rootPageId = "Overview-e65926fae6094b1a962bf9ea44489139";

export const loader: LoaderFunction = async ({ request }) => {
  let url = new URL(request.url);
  let forceUpdate = Boolean(url.searchParams.get("forceUpdate"));
  let pages = await getNavigationLinks(forceUpdate);

  return { pages };
};

export default function Dashboard() {
  const { pages } = useLoaderData<{ pages: MiniPage[] }>();

  return (
    <div
      style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}
      className="mx-auto"
    >
      <div className="flex flex-row max-w-screen-2xl mx-auto">
        <aside className="w-72 bg-sidebg px-7 pt-7 flex-shrink-0">
          <div className="flex flex-row items-center">
            <img src="/docs-assets/images/logo.svg" alt="logo" width={30} />
            <h1 className="text-xl ml-1">
              Noor
              <Link to="/docs">
                <span className="ml-1 text-textblue font-pacifico">Docs</span>
              </Link>
            </h1>
          </div>

          <div className="pt-5">
            {pages.map((page) => (
              <SideLink
                key={page.id}
                title={page.title}
                pageId={page.id}
                items={page.children}
              />
            ))}
          </div>
        </aside>
        <main className="w-full h-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

const selectedColor = "#DFECFF";

const SideLinkText = ({ children }: any) => {
  return <p className={`text-sm select-none text-slate-700`}>{children}</p>;
};

//@ts-ignore
const SideLink = ({
  title,
  items,
  pageId,
}: {
  title: string;
  pageId?: string;
  items?: MiniPage[];
}) => {
  let { pathname } = useLocation();
  let [open, setOpen] = useState(false);
  let pageLink = pageId ? mapPageUrl(pageId, title) : null;
  let hasChildren = items && items.length > 0;
  let inRootPage = pathname === pageLink;

  let titleNode = <SideLinkText>{title}</SideLinkText>;

  return (
    <>
      <div
        onClick={() => {
          setOpen(!open);
        }}
        style={{
          backgroundColor: inRootPage ? selectedColor : undefined,
          borderRadius: 8,
        }}
        className="flex flex-row items-center h-7"
      >
        {hasChildren ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="19"
            height="19"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#A2A2A2"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            transform={open ? "rotate(90)" : ""}
            style={{ paddingTop: 3 }}
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        ) : (
          <div style={{ width: 19 }} />
        )}

        {pageLink && !hasChildren ? (
          <Link to={pageLink}>{titleNode}</Link>
        ) : (
          titleNode
        )}
      </div>

      {open &&
        hasChildren &&
        items &&
        items.map((item) => {
          let pageLink = mapPageUrl(item.id, item.title);

          return (
            <div key={item.id}>
              <div
                style={{
                  backgroundColor: pathname === pageLink ? selectedColor : "",
                  borderRadius: 8,
                  paddingTop: 3,
                  paddingLeft: 32,
                }}
                className="h-7"
              >
                <Link to={pageLink}>
                  <SideLinkText>{item.title}</SideLinkText>
                </Link>
              </div>
            </div>
          );
        })}
    </>
  );
};

export const mapPageUrl = (pageId: string, name?: string) => {
  pageId = (pageId || "").replace(/-/g, "");

  if (rootPageId && pageId === rootPageId) {
    return "/docs";
  } else {
    // Add dashed name before utl to make it more beautiful
    return `/docs/${name ? nameToSafeUrl(name) + "-" : ""}${pageId}`;
  }
};

function nameToSafeUrl(name: string) {
  return name
    .replace(/\s/g, "-")
    .replace(/[`~!@#$%^&*()_|+=?;:'",.<>{}[\]\\/]/gi, "");
}
