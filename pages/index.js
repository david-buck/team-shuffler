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
  const { shareteam } = router.query;

  const shareTeamArray = shareteam?.split(",");

  const [team, setTeam] = useLocalStorage("team", []);

  const [shuffleTeam, setShuffleTeam] = useState([]);
  const [shuffles, setShuffles] = useState(1);

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
    <div
      className="bg-gray-900 antialiased
    text-white min-h-screen flex flex-col"
    >
      <Head>
        <title>Team Shuffler - the standup randomizer</title>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🔁</text></svg>"
        />
      </Head>

      <main className="flex-1 grid place-content-center py-10">
        <div className="flex flex-col gap-2 font-semibold">
          {shuffleTeam.length > 0 ? (
            shuffleTeam.map((e, key) => (
              <div
                key={key}
                style={{
                  fontSize: `clamp(3rem, ${50 / shuffleTeam.length}vh, 10rem)`,
                }}
              >
                {e}
              </div>
            ))
          ) : (
            <Link href="/settings" className="p-5 rounded-lg">
              <div className="cursor-pointer">
                <h1 className="text-5xl mb-4">Team Shuffler</h1>
                <p className="text-xl">Click here to add your team</p>
              </div>
            </Link>
          )}
        </div>
      </main>
      <footer className="p-5 flex justify-between sticky bottom-0">
        <div className="flex gap-x-4">
          <button onClick={() => setShuffles(shuffles + 1)}>Shuffle</button>
          <div className="relative">
            <button
              onClick={() => {
                navigator.clipboard.writeText(`
                  ${window.location.origin}${
                  team.length ? "?shareteam=" + team.join(",") : ""
                }
                `);
                setShowCopied(true);
              }}
            >
              Share
            </button>
            <div
              className={`${
                showCopied ? "opacity-100 bottom-8" : "opacity-0 bottom-6"
              } transition-all absolute select-none -left-4 whitespace-nowrap bg-black py-2 px-4 rounded`}
            >
              {team.length
                ? "Team link copied to clipboard"
                : "Link copied to clipboard"}
            </div>
          </div>
        </div>
        <Link href="settings">Settings</Link>
      </footer>
    </div>
  );
}
