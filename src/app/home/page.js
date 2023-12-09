"use client";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import WeaveDB from "weavedb-sdk";
import { useAccount } from "wagmi";

export default function Home() {
  const [responses, setResponses] = useState([]);
  const [userNotLoggedIn, setUserNotLoggedIn] = useState(false);
  const [loadingSurveys, setLoadingSurveys] = useState(true);
  const { address } = useAccount();
	const [db, setDB] = useState();

  const initDB = async () => {
    setLoadingSurveys(true);
    const db = new WeaveDB({
      contractTxId: "oj9GzEHQDlK_VQfvGBKFXvyq_zDHdr5m8N0PAU8GysM",
    });
    console.log("DB initing...")
    console.log(await db.init());
    console.log("Address is: " + address);

    if (address) {
      const responses = await db.cget("responses");
      setResponses(responses);
      // setForms(await db.cget("forms", ["author"], ["author", "==", address.toLowerCase()]));
      setUserNotLoggedIn(false);
    } else {
      setUserNotLoggedIn(true);
    }
    setDB(db);
    setLoadingSurveys(false);
  };

  useEffect(() => {
    initDB();
  }, []);

  return (
    <div>
      <Navbar />
      <main className="flex flex-col items-center w-full h-full">

      </main>
    </div>
  )
}

export const dynamic = 'force-dynamic'
