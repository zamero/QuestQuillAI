import { useEffect, useState } from "react"
import { useParams, useLocation, useNavigate } from "react-router-dom"
import axios from "axios"
import {
  TrashIcon,
  PencilIcon,
  ArrowLeftIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/solid"
import ChatPrompt from "../components/ChatPrompt"
import FormModal from "./FormModal"

function DashBoard4() {
  const handleGoBack = () => {
    navigate("/dashboard")
  }
  const navigate = useNavigate()
  const { id } = useParams()
  const [character, setCharacter] = useState<{
    name: string
    traits: string
    backstory: string
  } | null>(null)
  const location = useLocation()
  const [showForm, setShowForm] = useState(false)
  const [showChat, setShowChat] = useState(false)

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        console.log(`Fetching character with: `)
        const response = await axios.get(
          `https://chatlabs.up.railway.app/getone/${localStorage.getItem(
            "userId"
          )}/${location.state.index}`
        )
        console.log("Response:", response.data.character)
        console.log(response.data)
        setCharacter(response.data.character)
      } catch (error: any) {
        if (error.response && error.response.status === 404) {
          console.log("Character not found")
        } else {
          console.log("An error occurred:", error)
        }
      }
    }

    fetchCharacter()
  }, [id, location.state.index])

  const deleteCharacter = async (index: number) => {
    const response = await fetch(
      `https://chatlabs.up.railway.app/delete/${localStorage.getItem(
        "userId"
      )}/${index}`,
      { method: "delete" }
    )
    const res = await response.json()
    console.log(res)
    navigate("/dashboard")
  }

  if (!character) {
    return <div className="text-violet-500">Loading...</div>
  }
  return (
    <>
      {/* modal */}
      {showChat && (
        <div className="fixed inset-0 flex items-center justify-center bg-neutral-950/75">
          <div className="bg-neutral-800 rounded-lg w-2/3 h-4/6 max-h overflow-scroll overflow-x-hidden scrollbar-thin scrollbar-thumb-violet-800 scrollbar-track-neutral-800 flex flex-col">
            <button
              className="self-end p-2 text-violet-600 hover:text-violet-400 fixed z-10"
              onClick={() => setShowChat(!showChat)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
              </svg>
            </button>
            <ChatPrompt index={location.state.index} />
          </div>
        </div>
      )}

      {/*Banner */}
      <section className="bg-neutral-950">
        <div className="container mx-auto px-4 py-10">
          <h1 className="text-4xl font-light text-center text-slate-100">
            <span className="text-violet-500">CHARACTER</span> PROFILE
          </h1>
        </div>
      </section>

      {/*Card */}
      <div className="container mx-auto px-4 py-10">
        <div className="bg-neutral-950 rounded-lg shadow-lg card shadow-violet-500/100 outline outline-offset-2 outline-violet-950">
          <div className="p-5">
            <h1 className="mb-4 text-2xl font-semibold text-center uppercase text-violet-500">
              {character.name}
            </h1>
            <div className="mb-4">
              <h2 className=" mb-2 text-lg font-medium uppercase text-violet-500">
                Traits:
              </h2>
              <div className=" flex flex-wrap">
                {character.traits.split(",").map((trait, index) => (
                  <span
                    key={index}
                    className="zoom-in-trait flex items-center py-2 px-3 m-1 text-sm font-semibold text-white rounded-full bg-violet-700"
                  >
                    <ExclamationCircleIcon className="w-4 h-4 mr-1 text-white" />
                    <p className="text-white">{trait.trim()}</p>
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h2 className="mb-2 text-lg font-medium uppercase text-violet-500">
                Backstory:
              </h2>
              <p className="text-white">{character.backstory}</p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-row justify-between p-5">
            <div className="flex flex-row justify-between">
              <button
                onClick={handleGoBack}
                className="flex items-center justify-center py-2 px-5 font-bold text-white rounded-lg bg-violet-700"
              >
                <ArrowLeftIcon className="w-5" />
              </button>
            </div>
            <div className="flex flex-row justify-between">
              <button
                onClick={() => setShowForm(!showForm)}
                className="px-4 py-2  bg-violet-700 text-white rounded-lg mr-1"
              >
                <PencilIcon className="w-5" />
              </button>

              <button
                onClick={() => deleteCharacter(location.state.index)}
                className="px-4 py-2  bg-violet-700 text-white rounded-lg mr-1"
              >
                <TrashIcon className="w-5" />
              </button>

              <button
                onClick={() => setShowChat(!showChat)}
                className="px-4 py-2  bg-violet-700 text-white rounded-lg mr-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                  <path d="M5 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        {showForm && (
          <FormModal data={location.state.index} closeFormModal={setShowForm} />
        )}
      </div>
    </>
  )
}

export default DashBoard4
