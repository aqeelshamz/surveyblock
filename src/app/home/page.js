"use client";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import WeaveDB from "weavedb-sdk";
import { useAccount } from "wagmi";
import { CiCirclePlus } from "react-icons/ci";
import { FiBox, FiFileText, FiPlusCircle } from "react-icons/fi";
import { v4 as uuidv4 } from "uuid";
import { weavedbContractId, bgColors, formGenerationPrompt } from "../../utils/util";
import Section from "../../components/Animate";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import OpenAI from "openai";

export default function Home() {
  const [responses, setResponses] = useState([]);
  const [userNotLoggedIn, setUserNotLoggedIn] = useState(false);
  const [loadingSurveys, setLoadingSurveys] = useState(true);
  const { address } = useAccount();
  const [db, setDB] = useState();

  const [creatingSurvey, setCreatingSurvey] = useState(false);

  const [surveys, setSurveys] = useState([]);

  const [newSurveyName, setNewSurveyName] = useState("");
  const [newSurveyDescription, setNewSurveyDescription] = useState("");

  const initDB = async () => {
    setLoadingSurveys(true);
    const db = new WeaveDB({
      contractTxId: weavedbContractId,
    });
    console.log("DB initing...")
    console.log(await db.init());
    console.log("Address is: " + address);

    if (address) {
      const responses = await db.cget("responses");
      setResponses(responses);
      setSurveys(await db.cget("surveys", ["author"], ["author", "==", address.toLowerCase()]));
      setUserNotLoggedIn(false);
    } else {
      setUserNotLoggedIn(true);
    }
    setDB(db);
    setLoadingSurveys(false);
  };

  const createSurvey = async () => {
    setCreatingSurvey(true);

    const surveyId = uuidv4();
    const surveyData = {
      id: surveyId,
      author: db.signer(),
      title: newSurveyName,
      description: newSurveyDescription,
      fields: [
        { id: "a28b29", title: "Name", type: "text", required: true },
        { id: "z2cx29", title: "Feedback", type: "longtext", required: true },
      ],
      responses: 0,
    };

    const tx = await db.add(surveyData, "surveys");
    console.log(tx);

    console.log("Saved to DB");

    setCreatingSurvey(false);

    document.getElementById("newsurvey_modal").close();

    setTimeout(() => {
      window.location.href = "/editor/" + surveyId;
    }, 5000);
  };

  const [generatingForm, setGeneratingForm] = useState(false);
  const [prompt, setPrompt] = useState("");

  const generateForm = async () => {
    setGeneratingForm(true);
    const openai = new OpenAI({
      apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
      dangerouslyAllowBrowser: true,
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: formGenerationPrompt },
        { role: "user", content: prompt },
      ],
    });

    console.log("completion: ", completion);

    var data = JSON.parse(completion.choices[0].message.content);

    if (data) {
      //Save form to database
      const surveyId = uuidv4();
      const surveyData = {
        id: surveyId,
        author: db.signer(),
        title: data?.title,
        description: data?.description,
        fields: data?.fields,
        responses: 0,
      };

      const tx = await db.add(surveyData, "surveys");
      console.log(tx);

      console.log("Saved to DB");

      document.getElementById("newsurvey_modal").close();

      setTimeout(() => {
        window.location.href = "/editor/" + surveyId;
      }, 5000);
    } else {
      console.log("Error generating survey");
      s;
    }

    setGeneratingForm(false);
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
              <div onClick={() => document.getElementById("newsurvey_modal").showModal()} className="hover:shadow-2xl duration-100 cursor-pointer border-2 flex flex-col min-h-[400px] min-w-[350px] mb-10 mr-10 rounded-3xl shadow-lg overflow-hidden">
                <div className="flex flex-col items-center justify-center w-full h-full">
                  <CiCirclePlus className="h-40 w-40 mb-2" />
                  <p className="font-semibold text-xl">New Survey</p>
                </div>
              </div>
              {
                surveys?.map((survey, index) => {
                  return <Section key={index} translate="translateY(10px)" duration={((index * 0.075) + 0.5).toString() + "s"}><div onClick={() => (window.location.href = "/editor/" + survey?.data?.id)} className="hover:shadow-2xl duration-100 cursor-pointer border-2 flex flex-col h-full w-full mb-10 mr-10 rounded-3xl shadow-lg overflow-hidden">
                    <div style={{ background: `linear-gradient(45deg, ${bgColors[survey?.data?.title.toString().toLowerCase()[0]][0]}, ${bgColors[survey?.data?.title.toString().toLowerCase()[0]][1]})` }} className={"flex items-center justify-center w-full h-full"}>
                      <FiFileText style={{ color: bgColors[survey?.data?.title.toString().toLowerCase()[0]][1] }} className={"h-40 w-40 mb-2"} />
                    </div>
                    <div className="p-5 h-auto">
                      <p className="font-semibold text-lg">{survey?.data?.title}</p>
                      <p className="text-gray-500">No responses</p>
                    </div>
                  </div></Section>
                })
              }
            </div>
          </div>
        )}
      </main>
      <dialog id="newsurvey_modal" className="modal">
        <div className="modal-box max-w-xl">
          <h3 className="flex items-center font-bold text-2xl"><FiBox className="mr-2" /> Create survey</h3>
          {creatingSurvey ? (
            "Creating survey..."
          ) : (
            <div className="flex flex-col mt-6 max-w-fulloverflow-hidden">
              <p className="mb-2 font-semibold">Generate using AI</p>
              <textarea className="textarea textarea-bordered" placeholder="Your prompt here.." value={prompt} onChange={(x) => setPrompt(x.target.value)}></textarea>
              <button className="btn btn-primary mb-4 mt-4" onClick={() => {
                if (generatingForm) {
                  return;
                }

                generateForm();
              }}>✨ Generate Survey Form</button>
              <hr className="my-4" />
              <p className="mb-2 font-semibold">Or, create manually</p>
              <p className="mb-2">Survey Name</p>
              <input type="text" placeholder="Type here" className="input input-bordered w-full mb-5" value={newSurveyName} onChange={(x) => setNewSurveyName(x.target.value)} />
              <p className="mb-2">Description</p>
              <textarea className="textarea textarea-bordered mb-5" placeholder="Description" value={newSurveyDescription} onChange={(x) => setNewSurveyDescription(x.target.value)}></textarea>
            </div>
          )}
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
            <button className={"btn btn-primary ml-2 " + (generatingForm ? "opacity-50" : "")} onClick={() => {
              if (generatingForm) {
                return;
              }
              createSurvey();
            }}>Create Survey</button>
          </div>
        </div>
      </dialog>
    </div>
  )
}

export const dynamic = 'force-dynamic'
