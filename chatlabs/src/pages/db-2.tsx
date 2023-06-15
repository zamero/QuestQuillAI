import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import Footer from "../components/Footer"
import CharacterForm, { CharacterFormData } from "../components/CharacterForm"

const Dashboard2: React.FC = () => {
  const [response, setResponse] = useState("")
  const [name, setName] = useState("")
  const [backstory, setBackstory] = useState("")
  const [traits, setTraits] = useState("")

  const navigate = useNavigate()

  const handleSubmit = async (formData: CharacterFormData): Promise<void> => {
    try {
      const { name, backstory, traits } = formData
      const response = await fetch(
        `https://chatlabs.up.railway.app/create/${localStorage.getItem(
          "userId"
        )}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            backstory,
            traits,
          }),
        }
      )

      const data = await response.json()
      setResponse(data.message)

      setName("")
      setBackstory("")
      setTraits("")

      navigate("/dashboard")
    } catch (error) {
      console.error(error)
      setResponse("An error occurred. Please try again.")
    }
  }

  const handleNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setName(event.target.value)
  }

  const handleBackstoryChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    setBackstory(event.target.value)
  }

  const handleTraitsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setTraits(event.target.value)
  }

  return (
    <>
      {/* ... */}
      <div className="flex justify-center mt-20 pt-10 mb-20">
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl shadow-lg shadow-violet-500/50 hover:shadow-violet-500/100 transition duration-300">
          <CharacterForm
            name={name}
            backstory={backstory}
            traits={traits}
            onNameChange={handleNameChange}
            onBackstoryChange={handleBackstoryChange}
            onTraitsChange={handleTraitsChange}
            onSubmit={handleSubmit}
          />
        </div>
      </div>

      {response && <p>{response}</p>}
      <Footer />
    </>
  )
}

export default Dashboard2
