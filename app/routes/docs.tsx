import {
  json,
  Link,
  LoaderFunction,
  Outlet,
  useLoaderData,
  useLocation,
  useTransition,
} from "remix";
import { useEffect, useState } from "react";
import { getNavigationLinks, MiniPage } from "~/utils/pageCache.server";
import { SpinnerCircular } from "spinners-react";
import { MenuIcon } from "~/components/MenuIcon";

export const rootPageId = "Overview-e65926fae6094b1a962bf9ea44489139";

export const loader: LoaderFunction = async ({ request }) => {
  let url = new URL(request.url);
  let forceUpdate = Boolean(url.searchParams.get("forceUpdate"));
  let pages = await getNavigationLinks(forceUpdate);

  let headers = {
    "Cache-Control": forceUpdate ? "" : "stale-while-revalidate=3600",
  };

  return json({ pages }, { headers });
};

export default function Dashboard() {
  const { pages } = useLoaderData<{ pages: MiniPage[] }>();
  let { state } = useTransition();
  let [menuOpen, setMenuOpen] = useState(false);

  let menuOpenStyles = menuOpen
    ? `h-screen w-screen fixed top-0 left-0 z-10`
    : "h-20";

  useEffect(() => {
    if (state === "loading") {
      setMenuOpen(false);
    }
  }, [state]);
  return (
    <div
      style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}
      className="mx-auto"
    >
      <div className="flex flex-col sm:flex-row h-screen max-w-screen-2xl mx-auto">
        <aside
          className={`sm:w-72 sm:h-full w-full bg-sidebg px-7 pt-7 flex-shrink-0 ${menuOpenStyles} `}
        >
          <div className="flex flex-row items-center">
            <img src="/docs-assets/images/logo.svg" alt="logo" width={30} />
            <h1 className="text-xl ml-1">
              Noor
              <Link to="/docs">
                <span className="ml-1 text-textblue font-pacifico">Docs</span>
              </Link>
            </h1>

            <div
              className="ml-auto w-10 h-10 rounded-lg hover:bg-slate-100 items-center justify-center flex sm:hidden"
              onClick={() => {
                setMenuOpen((open) => !open);
              }}
            >
              <MenuIcon />
            </div>
          </div>

          <div className="pt-7">
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
        <main className="w-full h-full flex-grow">
          {state === "loading" ? (
            <div className="flex items-center justify-start w-full h-full">
              <SpinnerCircular
                color="#51b9ff"
                secondaryColor="#c3e5f9"
                size={50}
                thickness={60}
                style={{ margin: "0 auto" }}
              />
            </div>
          ) : (
            <Outlet />
          )}
        </main>
      </div>
    </div>
  );
}

const selectedColor = "#e5effe";

const SideLinkText = ({ children, active }: any) => {
  return (
    <p
      className={`text-sm select-none text-slate-700 active:text-slate-500 ${
        active ? "text-indigo-800" : ""
      }`}
    >
      {children}
    </p>
  );
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

  let titleNode = (
    <div
      onClick={() => {
        setOpen(!open);
      }}
      style={{
        backgroundColor: inRootPage ? selectedColor : undefined,
        borderRadius: 8,
      }}
      className="flex flex-row items-center h-7 mb-0.5 hover:bg-slate-100 transition-colors duration-100 cursor-pointer"
    >
      {hasChildren ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="19"
          height="19"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#A2A2A2"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          transform={open ? "rotate(90)" : ""}
          style={{ paddingTop: 1 }}
        >
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      ) : (
        <div style={{ width: 19 }} />
      )}

      <SideLinkText active={inRootPage}>{title}</SideLinkText>
    </div>
  );

  return (
    <>
      {pageLink && !hasChildren ? (
        <Link to={pageLink} prefetch="render">
          {titleNode}
        </Link>
      ) : (
        titleNode
      )}

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
