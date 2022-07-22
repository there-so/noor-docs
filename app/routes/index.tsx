import { Link } from "remix";

export default function Dashboard() {
  return (
    <>
      <div className="flex items-center justify-center mt-12">
        <div className="max-w-lg p-12 rounded-lg bg-slate-100 ">
          <h2 className="text-slate-400 font-bold mb-2">
            All-new Noor app coming soon.{" "}
          </h2>
          <h1 className="mb-4 text-2xl">
            Chat, collaborate, and build together as a location-independent
            team.
          </h1>
          <p>
            Team communication apps have been realtime text-first for a decade.
            Audio calls and video chats couldn't be more far off from how
            knowledge workers like things to be. We've re-thought the experience
            and fine-tuned it for 2 years using first hand experience working as
            a small startup team.
          </p>
          <br />
          <p>
            We think differently from virtual office apps. Re-making every
            interaction like walking to a desk in a modern app sounds cool but
            in fact terrifying for knowledge workers. It takes cognitive load,
            and adds stress to our workday.
          </p>
          <br />
          <p>
            At Noor, our principles in making the app are to be:
            <ol className="list-decimal	mt-3">
              <li>Out of your way in the background</li>
              <li>
                Have the default state be deep work (unless you decide to
                collaborate)
              </li>
              <li>One-click interactions for every action</li>
              <li>Lightweight</li>
            </ol>
          </p>
          <br />
          <p>
            We've took our learnings from the last 2 years building 16
            iterations and we're making an all-new app in native Rust to make it
            snappy, high quality and reliable.
          </p>
          <br />
          <p>
            <small>
              <a href="https://usenoor.com" target="_blank" rel="noreferrer">
                Previous Website → usenoor.com
              </a>
            </small>
          </p>
          <p>
            <small>
              <a href="mailto:hey@usenoor.com" target="_blank" rel="noreferrer">
                Write to Us → hey@usenoor.com
              </a>
            </small>
          </p>
          <p>
            <small>
              <a
                href="https://twitter.com/use_noor"
                target="_blank"
                rel="noreferrer"
              >
                Twitter → @Use_Noor
              </a>
            </small>
          </p>
        </div>
      </div>
    </>
  );
}
