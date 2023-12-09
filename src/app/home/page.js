"use client";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import WeaveDB from "weavedb-sdk";
import { useAccount } from "wagmi";
import { CiCirclePlus } from "react-icons/ci";

export default function Home() {
  const [responses, setResponses] = useState([]);
  const [userNotLoggedIn, setUserNotLoggedIn] = useState(false);
  const [loadingSurveys, setLoadingSurveys] = useState(true);
  const { address } = useAccount();
  const [db, setDB] = useState();

  const [surveys, setSurveys] = useState([]);

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
      // setSurveys(await db.cget("surveys", ["author"], ["author", "==", address.toLowerCase()]));
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
        {loadingSurveys ? (
          ""
        ) : userNotLoggedIn ? (
          <div className="flex flex-col">
            <p className="text-xl my-4 font-semibold mb-5">Connect your wallet to start creating surveys.</p>
            <ConnectButton />
          </div>
        ) : ""}
        {userNotLoggedIn ? (
          ""
        ) : loadingSurveys ? (
          <div>
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          <div className="w-full h-full p-5 px-10">
            <p className="text-2xl my-4 mb-7 font-semibold">My surveys ({surveys.length})</p>
            <div className="flex flex-wrap w-full">
              <div onClick={() => document.getElementById("my_modal_1").showModal()} className="hover:shadow-2xl duration-100 cursor-pointer border-2 flex flex-col min-h-[400px] min-w-[350px] mb-10 mr-10 rounded-3xl shadow-lg overflow-hidden">
                <div className="flex flex-col items-center justify-center w-full h-full">
                  <CiCirclePlus className="h-40 w-40 mb-2" />
                  <p className="font-semibold text-xl">New Survey</p>
                </div>
              </div>
              {
                surveys?.map((form, index) => {
                  return <Section key={index} translate="translateY(10px)" duration={((index * 0.075) + 0.5).toString() + "s"}><div onClick={() => (window.location.href = "/editor/" + form?.data?.id)} className="hover:shadow-2xl duration-100 cursor-pointer border-2 flex flex-col h-full w-full mb-10 mr-10 rounded-3xl shadow-lg overflow-hidden">
                    <div style={{ background: `linear-gradient(45deg, ${bgColors[form?.data?.title.toString().toLowerCase()[0]][0]}, ${bgColors[form?.data?.title.toString().toLowerCase()[0]][1]})` }} className={"flex items-center justify-center w-full h-full"}>
                      <FiFileText style={{ color: bgColors[form?.data?.title.toString().toLowerCase()[0]][1] }} className={"h-40 w-40 mb-2"} />
                    </div>
                    <div className="p-5 h-auto">
                      <p className="font-semibold text-lg">{form?.data?.title}</p>
                      <p className="text-gray-500">No responses</p>
                    </div>
                  </div></Section>
                })
              }
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export const dynamic = 'force-dynamic'
