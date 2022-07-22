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
            When Slack came out we all worked at the office, now we are anywhere
            we want. But we're still trapped in the text-chat/meetings binary.
            We at Noor with average age of 21 y/o, we simply couldn't accept the
            status quo. It was weird to go from being in one room, to just...
            texting all day. So we started building an app for ourselves. It
            took 2.5 years and 16 iterations to re-think how we teamwork over
            the internet.
          </p>
          <br />
          <p>
            We believe the ideal way to work has both sync and async moments
            during a workday. It's complex, so we give you the power to choose
            how much you want to be present at any moment. To summarize Noor app
            concepts in 5 bullet-points:
            <ol className="list-decimal	mt-3">
              <li>
                Lives in the background <a href="#f2">[2]</a>
              </li>
              <li>
                Assume default is deep work (unless they decide to collaborate)
              </li>
              <li>One-click to share anything</li>
              <li>
                Enable full-bandwidth, real-life-level collaboration but give
                the control to choose the presence level{" "}
                <a href="#f3">
                  <small>[3]</small>
                </a>
              </li>
              <li>Lightweight</li>
            </ol>
          </p>
          <br />
          <p>
            Meeting apps like Zoom or lately Around are established among teams
            but as much as we like to bounce ideas and brainstorm, meetings are
            draining. Virtual office apps like Tandem, Gather, Teamflow, etc
            (there's too many) although are closer to real life, put too much
            focus on being present therefore become annoying at times. This is
            opposed to how makers do great work (
            <a href="http://www.paulgraham.com/makersschedule.html">
              read more
            </a>
            ). Game-like full-screen apps of this kind are nice for 2 hours hang
            out, but add too much cognitive load to keep in the background.
            Taking the brain power you need to get in the zone.
          </p>
          <br />
          <p>We think differently (Was that Apple's? Ugh).</p>
          <br />

          <p>
            We think differently (Was that Apple's? Ugh). We've took our
            learnings from using our app for hundreds of hours each week
            ourselves and our friends in other teams. Now we're making an
            all-new app in native Rust to make it reliable, snappy, and of
            stellar quality.
          </p>

          <br />

          <p>
            — <a href="https://twitter.com/morajabi">Mohamad</a>,{" "}
            <a href="https://twitter.com/benrajabi">Ben</a>,{" "}
            <a href="https://twitter.com/moeindana">Moein</a>, and{" "}
            <a href="https://twitter.com/dena_sohrabi">Dena</a> ✌️
          </p>
          <br />
          <p id="f1">
            <small>
              [1] We utilize macOS menubar and stay out of your dock. App is
              designed to take minimum screen space. Use global keyboard
              shortcuts to toggle anything without opening the app. We bring
              actions in your sight when you need them without opening the full
              app window.
            </small>
          </p>
          <br />
          <p id="f2">
            <small>
              [2] Level zero is no promise to respond to messages and without
              read-receipts. It's important to always keep this guilt-free.
              Level 1 is text-only. Level 2 is being open to talking in voice.
              Level 3 is full-on presence via collaborative screen-sharing or
              enabling camera with your favorite design/whiteboard app like
              FigJam. An optional level 4 books a flight ticket to your
              teammate's nearest airport. Pack your things before using it!
            </small>
          </p>
          <br />
          <p>
            <small>
              If you really want to try something now,{" "}
              <a
                href="https://usenoor.com/download"
                target="_blank"
                rel="noreferrer"
                className="underline"
              >
                download our previous Electron version
              </a>{" "}
              — which is still a great app meanwhile.
            </small>
          </p>
          <br></br>
          <hr />
          <br></br>
          <p>
            <small>
              <a href="https://usenoor.com" target="_blank" rel="noreferrer">
                usenoor.com →
              </a>
            </small>
          </p>
          <p>
            <small>
              <a href="mailto:hey@usenoor.com" target="_blank" rel="noreferrer">
                hey@usenoor.com →
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
                Follow @use_noor →
              </a>
            </small>
          </p>
        </div>
      </div>
    </>
  );
}
