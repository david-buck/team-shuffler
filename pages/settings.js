import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import useLocalStorage from "../hooks/useLocalStorage";

const Cross = () => (
  <svg
    viewBox="0 0 16 16"
    width="16"
    height="16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3.46443 2.05086C3.07391 1.66033 2.44074 1.66033 2.05022 2.05086C1.65969 2.44138 1.65969 3.07455 2.05022 3.46507L12.5355 13.9504C12.926 14.3409 13.5592 14.3409 13.9497 13.9504C14.3402 13.5598 14.3402 12.9267 13.9497 12.5361L3.46443 2.05086Z"
      fill="currentColor"
    />
    <path
      d="M12.5356 2.05086C12.9261 1.66033 13.5593 1.66033 13.9498 2.05086C14.3403 2.44138 14.3403 3.07455 13.9498 3.46507L3.4645 13.9504C3.07398 14.3409 2.44081 14.3409 2.05029 13.9504C1.65976 13.5598 1.65976 12.9267 2.05029 12.5361L12.5356 2.05086Z"
      fill="currentColor"
    />
  </svg>
);

export default function Home() {
  const router = useRouter();
  const [team, setTeam] = useLocalStorage("team");
  const [teamState, setTeamState] = useState([]);

  useEffect(() => {
    setTeamState(team);
  }, [team]);

  const handleInputChange = (value, index) => {
    const nextState = teamState.map((e, i) => {
      if (i === index) {
        return value;
      } else {
        return e;
      }
    });
    setTeamState(nextState);
  };

  const removeTeamMember = (index) => {
    const nextState = teamState.filter((e, i) => i !== index);
    setTeamState(nextState);
  };

  return (
    <div className="bg-gray-700 min-h-screen grid place-content-center">
      <Head>
        <title>Standomizer settings</title>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🔁</text></svg>"
        />
      </Head>

      <main className="flex flex-col gap-5">
        {teamState.map((e, index) => (
          <div className="flex gap-x-3" key={index}>
            <input
              className="p-2 text-2xl rounded-lg"
              value={e}
              onChange={(e) => {
                handleInputChange(e.target.value, index);
                console.log(e.target.value);
              }}
            />
            <button
              className="bg-white grid place-content-center w-12 h-12 rounded-full ring-1 ring-white"
              onClick={() => removeTeamMember(index)}
            >
              <Cross />
            </button>
          </div>
        ))}
        <button
          className="bg-white bg-opacity-80 p-2 text-2xl rounded-lg font-bold"
          onClick={() => {
            setTeamState([...teamState, ""]);
          }}
        >
          Add
        </button>
        <button
          className="bg-white bg-opacity-80 p-2 text-2xl rounded-lg font-bold"
          onClick={() => {
            setTeam(teamState);
            router.push("/");
          }}
        >
          Save
        </button>
        <button
          className="p-2 text-2xl rounded-lg text-gray-200"
          onClick={() => {
            router.push("/");
          }}
        >
          Cancel
        </button>
      </main>
    </div>
  );
}
