import { Link } from "remix";

export default function Dashboard() {
  return (
    <>
      <div className="flex items-center justify-center mt-12">
        <div className="max-w-2xl p-12 rounded-lg bg-slate-100 ">
          <h2 className="text-slate-400 font-bold mb-2">
            All-new Noor app coming soon.{" "}
          </h2>
          <h1 className="mb-4 text-2xl">
            Chat, collaborate, and build together as a location-independent
            team.
          </h1>
          <p>
            When Slack came out we spent the day at the office, now we are
            wherever we want. But we're still trapped in the text-chat/meetings
            binary. We can do better. At Noor with an average age of 21 y/o, we
            could not accept the status quo. It was weird to go from being in
            one room, to just... texting all day. (No the answer isn't all-day
            meetings) So we started building an app for ourselves. It took 2.5
            years, hundreds of designs, and 16 app iterations to radically
            re-think teamwork over the internet.
          </p>
          <br />
          <p>
            We believe the ideal way to work has can't fall into either sync or
            async mode. Ideally it's a variety of work-modes during the day. So
            we want you to have full power to choose how much you want to be
            present at any moment. At 10am you feel like being in the zone? No
            questions asked. At 1pm you can be in a chance encounter over voice
            because you felt like so. To summarize Noor app concept in 5
            bullet-points:
            <ol className="list-decimal	mt-3">
              <li>
                Enable full-bandwidth, real-life-level collaboration but give
                the control to choose the presence level{" "}
                <a href="#f-levels">
                  <small>[•]</small>
                </a>
              </li>
              <li>
                Assume default is deep work (unless they decide to collaborate)
              </li>
              <li>One-click to share anything</li>
              <li>
                Stays out of your way in the background{" "}
                <small>
                  <a href="#f2-bg">[•]</a>
                </small>
              </li>
              <li>Lightweight</li>
            </ol>
          </p>
          <br />
          <p>
            Meeting apps like Zoom, and Around use an established pattern among
            teams. But as much as we like to brainstorm, meetings aren't the way
            to get things done and relying on them is draining. Virtual office
            apps like Tandem, Gather, Teamflow, etc (there's too many) —although
            are closer to real life— rely on being present at all times. This is
            opposed to how makers do great work (
            <a href="http://www.paulgraham.com/makersschedule.html">
              read more
            </a>
            ). Game-like full-screen apps of this kind are nice for 2 hours hang
            out, but add too much cognitive load to keep in the background.
            Taking the brain power you need to get in the zone. Many of the
            existing solutions are slow, CPU-heavy, and feature-bloated. We
            didn't like embedding all our apps within iframes under our video
            avatars.
          </p>
          <br />
          <p>
            We wanted to build something we love to talk to our teammates during
            the day and close at our will. After using our app for hundreds of
            hours each week just ourselves and then launching a v1, we learned a
            lot more and set out to build an all-new app. This time in native
            Rust to have full control over resources to make it snappy,
            lightweight, reliable and of stellar quality.
          </p>
          <br />
          <p>
            Follow us on Twitter to be notified when we publish the new app.
            It's different from existing attempts at the problem, while being
            familiar and easy to use. Our ultimate goal is nobody will remember
            the distinction of remote/office work—as we did in our team.{" "}
            <small>
              <a href="#f-office">[•]</a>
            </small>
          </p>

          <br />

          <p>
            — <a href="https://twitter.com/morajabi">Mohamad</a>,{" "}
            <a href="https://twitter.com/benrajabi">Ben</a>,{" "}
            <a href="https://twitter.com/moeindana">Moein</a>, and{" "}
            <a href="https://twitter.com/dena_sohrabi">Dena</a> ✌️
          </p>
          <br />
          <p id="f-bg">
            <small>
              • We utilize macOS menubar and stay out of your dock. App is
              designed to take minimum screen space. Use global keyboard
              shortcuts to toggle anything without opening the app. We bring
              actions in your sight when you need them without opening the full
              app window.
            </small>
          </p>
          <br />
          <p id="f-levels">
            <small>
              • Level zero is no promise to respond to messages and without
              read-receipts. It's important to always keep this guilt-free.
              Level 1 is text-only. Level 2 is being open to talking in voice.
              Level 3 is full-on presence via collaborative screen-sharing or
              enabling camera with your favorite design/whiteboard app like
              FigJam. An optional level 4 books a flight ticket to your
              teammate's nearest airport. Pack your things before using it!
            </small>
          </p>
          <br />
          <p id="f-office">
            <small>
              • 4 of us spend most of the year near the same city, often within
              20 minutes of a cosy office with coffee machine, kitchen, a
              sleep-friendly coach, separate rooms, and food. After the 3rd
              iteration of Noor (called There X at the time) we suddenly
              realized it's no longer being felt whether we are at the office
              sitting together or at home using Noor. After Noor being more
              stable, we even liked it more for getting things done as we had
              control on when to be present.
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
