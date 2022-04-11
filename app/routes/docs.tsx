import { Link, Outlet, useLoaderData, useLocation } from "remix";
import { NotionRenderer } from "react-notion-x";
import { notion } from "~/utils/notion.server";
import { useState } from "react";

export const rootPageId = "Overview-e65926fae6094b1a962bf9ea44489139";
const navigationPage = "Docs-abe4c4c94e4b440cb937514d8ddeec07";
const docsBlockId = "abe4c4c9-4e4b-440c-b937-514d8ddeec07";

export const loader = async () => {
  const recordMap = await notion.getPage(navigationPage);

  let allLinks = [];

  for (let [key, record] of Object.entries(recordMap.block)) {
    if (
      record.value.type === "page" &&
      record.value.parent_id === docsBlockId
    ) {
      allLinks.push({
        title: record.value.properties?.title[0],
        pageId: record.value.id,
      });
      console.log(record);
      console.log("Page", record.value.properties?.title[0]);
    }
  }

  return { allLinks, recordMap };
};

export default function Dashboard() {
  const { allLinks, recordMap } = useLoaderData();
  console.log(recordMap);
  let { pathname } = useLocation();
  return (
    <div
      style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}
      className=" mx-auto"
    >
      <div className="flex flex-row ">
        <aside className="w-72 bg-sidebg px-7 pt-7">
          <div className="flex flex-row items-center">
            <img src="/images/logo.svg" alt="logo" width={30} />
            <h1 className="text-xl ml-1">
              Noor
              <span className="ml-1 text-textblue font-pacifico">Docs</span>
            </h1>
          </div>

          <div className="pt-5">
            <SideLink title="Rooms" pageId="73ad6242172241de829cc2d0ff858ca9" />
            <SideLink
              title="Feed"
              items={[
                {
                  pageId: "8939d09406ba4446b5d9b51e488463ff",
                  title: "When to use it",
                },
                {
                  pageId: "7ef7586cb1f24e43a0d9633bf393de35",
                  title: "How to use it",
                },
              ]}
            />
          </div>
        </aside>
        <main className="w-full h-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

//@ts-ignore
const SideLink = ({
  title,
  items,
  pageId,
}: {
  title: string;
  pageId?: string;
  items: { title: string; pageId: string }[];
}) => {
  let { pathname } = useLocation();
  console.log({ pathname });
  let [open, setOpen] = useState(false);
  let pageLink = mapPageUrl(pageId);
  return (
    <>
      <div
        onClick={() => {
          setOpen(!open);
        }}
        className="flex flex-row"
      >
        {items && (
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
        )}

        <Link to={pageLink}>
          <p
            className={`text-md pb-1 ${
              !open ? "text-textgrey" : "text-textlightblue font-medium"
            }`}
          >
            {title}
          </p>
        </Link>
      </div>
      {open &&
        items &&
        //@ts-ignore
        items.map((item) => {
          let pageLink = mapPageUrl(item.pageId);
          return (
            <div key={item.pageId}>
              <div
                style={{
                  backgroundColor: pathname === pageLink ? "#DFECFF" : "",
                  borderRadius: 8,
                  paddingTop: 3,
                }}
              >
                <Link to={pageLink}>
                  <p className="text-md pl-6 pb-0">{item.title}</p>
                </Link>
              </div>
            </div>
          );
        })}
    </>
  );
};

export const mapPageUrl = (pageId: string) => {
  pageId = (pageId || "").replace(/-/g, "");

  if (rootPageId && pageId === rootPageId) {
    return "/docs";
  } else {
    return `/docs/${pageId}`;
  }
};
