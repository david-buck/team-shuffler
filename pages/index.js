import { useEffect, useState } from "react";

import { useRouter } from "next/router";

import Head from "next/head";
import Link from "next/link";

import useLocalStorage from "../hooks/useLocalStorage";

function shuffle(arr) {
  return Array(arr.length)
    .fill(null)
    .map((_, i) => [Math.random(), i])
    .sort(([a], [b]) => a - b)
    .map(([, i]) => arr[i]);
}

export default function Home() {
  const router = useRouter();
  const searchParams = new URLSearchParams(router.asPath.split("?")[1]);

  const shareteam = searchParams.get("shareteam");
  const shareTeamArray = shareteam?.split(",");

  const [team, setTeam] = useLocalStorage("team", []);

  const [shuffleTeam, setShuffleTeam] = useState([]);
  const [shuffles, setShuffles] = useState(1);

  const [copyMessage, setCopyMessage] = useState("");

  const [showCopied, setShowCopied] = useState(false);

  useEffect(() => {
    if (showCopied === true) {
      setTimeout(() => setShowCopied(false), 3000);
    }
  }, [showCopied]);

  useEffect(() => {
    shareTeamArray?.length > 1 && setTeam(shareTeamArray);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shareteam]);

  useEffect(() => {
    setShuffleTeam(shuffle(team));
  }, [team, shuffles]);

  return (
    <div className="flex min-h-screen flex-col bg-zinc-950 text-white antialiased">
      <Head>
        <title>Team Shuffler - the standup randomizer</title>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🔁</text></svg>"
        />
      </Head>

      <main className="grid flex-1 place-content-center py-10">
        <div className="flex flex-col gap-2 font-semibold">
          {shuffleTeam.length > 0 ? (
            shuffleTeam.map((e, key) => (
              <div
                key={key}
                style={{
                  fontSize: `clamp(2rem, ${50 / shuffleTeam.length}vh, 10rem)`,
                }}
              >
                {e}
              </div>
            ))
          ) : (
            <Link href="/settings" className="rounded-lg p-5">
              <div className="cursor-pointer">
                <h1 className="mb-4 text-5xl">Team Shuffler</h1>
                <p className="text-center text-xl">
                  Click here to add your team
                </p>
              </div>
            </Link>
          )}
        </div>
      </main>
      <footer className="sticky bottom-0 flex justify-between p-5">
        <div className="flex gap-x-4">
          <button onClick={() => setShuffles(shuffles + 1)}>Shuffle</button>
          <div className="relative">
            <button
              onClick={() => {
                const url = new URL(window.location.origin);
                let message;
                if (team.length) {
                  const searchParams = new URLSearchParams();
                  searchParams.set("shareteam", team.join(","));
                  url.search = searchParams.toString();
                  message = "Team link copied to clipboard";
                } else {
                  message = "Link copied to clipboard";
                }
                navigator.clipboard.writeText(url.toString());
                setCopyMessage(message);
                setShowCopied(true);
              }}
            >
              Share
            </button>

            <div
              className={`${
                showCopied ? "bottom-8 opacity-100" : "bottom-6 opacity-0"
              } absolute -left-4 select-none whitespace-nowrap rounded bg-black px-4 py-2 transition-all`}
            >
              {copyMessage}
            </div>
          </div>
        </div>
        <Link href="settings">Settings</Link>
      </footer>
    </div>
  );
}
