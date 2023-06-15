import axios from "axios"
import { ChangeEvent, useEffect, useState } from "react"

function ChatPrompt({ index }: { index: number }) {
  const [prompt, setPrompt] = useState("")
  const [submittedPrompt, setSubmittedPrompt] = useState("")
  const [submittedPromptArray, setSubmittedPromptArray] = useState<
    {
      id: string
      prompt: string
    }[]
  >([])
  const [audioUrl, setAudioUrl] = useState("")
  const [audioUrlArray, setAudioUrlArray] = useState<string[]>([])
  const [audioKey, setAudioKey] = useState(0)
  const [avatarURL] = useState(localStorage.getItem("avatar"))
  const [isChatting, setIsChatting] = useState(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.target.value)
    console.log(e.target.value)
  }

  const chat = async () => {
    if (isChatting) {
      return
    }

    setIsChatting(true)
    submittedPrompt
    setSubmittedPrompt(prompt)
    const newPrompt = prompt

    try {
      const response = await axios.post(
        `https://chatlabs.up.railway.app/prompt/${localStorage.getItem(
          "userId"
        )}/${index}`,
        {
          ask: newPrompt,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          responseType: "arraybuffer",
        }
      )

      console.log(newPrompt)
      console.log(response)

      const audioBlob = new Blob([response.data], { type: "audio/mpeg" })
      const url = URL.createObjectURL(audioBlob)

      setSubmittedPromptArray((prevArray) => [
        ...prevArray,
        { id: Date.now().toString(), prompt: newPrompt },
      ])

      setAudioUrl(url)
      setAudioKey(audioKey + 1)
      setIsChatting(false)
    } catch (err) {
      console.log(index)
      setIsChatting(false)
    }
  }

  useEffect(() => {
    if (audioUrl) {
      setAudioUrlArray((prevArray) => [...prevArray, audioUrl])
    }
  }, [audioUrl])

  return (
    <>
      <div className="w-full h-full flex flex-col relative justify-between">
        <div>
          {audioUrlArray.map((url, audioIndex) => (
            <div key={audioIndex} className="flex flex-col">
              <div className="flex py-4 flex-row items-center justify-start bg-neutral-900 p-5">
                <img
                  className="w-12 rounded"
                  src={avatarURL || undefined}
                  alt=""
                />
                <p className="text-neutral-100 ml-2 font-semibold text-md">
                  {submittedPromptArray[audioIndex].prompt}
                </p>
              </div>
              <div className="flex flex-row items-center justify-end p-5">
                <img
                  src="https://drive.google.com/uc?id=1NJrgM8zoisyIYc_hE66zxhEEOA4Po76h"
                  className="h-12 rounded order-1 ml-3 py-2 px-1 bg-neutral-900"
                  alt="Chatlabs Logo"
                />
                <audio controls>
                  <source src={url} type="audio/mpeg" />
                </audio>
              </div>
            </div>
          ))}
        </div>
        <div className="sticky p-5 bg-neutral-900 bottom-0 left-0 right-0 flex justify-center items-center">
          <input
            type="text"
            name="input"
            className="w-3/4 p-3 bg-neutral-800 text-gray-100 rounded-lg outline-none font-bold"
            placeholder="Talk to character"
            onChange={handleChange}
          />
          <button
            className={`text-violet-600 bg-neutral-800 rounded-lg -translate-x-3 p-3 ${
              isChatting ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={chat}
            disabled={isChatting}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
            </svg>
          </button>
        </div>
      </div>
    </>
  )
}

export default ChatPrompt
