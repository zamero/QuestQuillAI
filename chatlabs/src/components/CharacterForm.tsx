import React from "react"
import { Link, useNavigate } from "react-router-dom"

export interface CharacterFormData {
  name: string
  backstory: string
  traits: string
  voice: string
}

interface CharacterFormProps {
  name: string
  backstory: string
  traits: string
  voice: string
  onNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onBackstoryChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
  onTraitsChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: (formData: CharacterFormData) => Promise<void>
}

const CharacterForm: React.FC<CharacterFormProps> = ({
  name,
  backstory,
  traits,
  voice,
  onNameChange,
  onBackstoryChange,
  onTraitsChange,
  onSubmit,
}) => {
  const navigate = useNavigate()
  const [isSubmitted, setIsSubmitted] = React.useState(false)

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault()

    const trimmedTraits = traits.trim()
    const trimmedVoice = voice.trim()
    const traitsArray = trimmedTraits.split(",").map((trait) => trait.trim())
    const isValidTraits = traitsArray.every(
      (trait) => trait !== "" && !trait.includes(" ")
    )

    if (!isValidTraits) {
      setIsSubmitted(true)
      return
    }

    await onSubmit({
      name: name.trim(),
      backstory: backstory.trim(),
      traits: trimmedTraits,
      voice: trimmedVoice,
    })

    navigate("/Dashboard")
  }

  const maxBackstoryLength = 3000
  const trimmedTraits = traits.trim()
  const traitsArray = trimmedTraits.split(",").map((trait) => trait.trim())
  const isValidTraits = traitsArray.every(
    (trait) => trait !== "" && !trait.includes(" ")
  )

  const handleBackstoryChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    onBackstoryChange(event)
    updateBackstoryCount(event.target.value)
  }

  const updateBackstoryCount = (value: string): void => {
    const remainingCharacters = maxBackstoryLength - value.length
    setBackstoryCount(remainingCharacters)
  }

  const [backstoryCount, setBackstoryCount] = React.useState(
    maxBackstoryLength - backstory.length
  )

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-neutral-950 rounded-xl shadow-lg p-10"
    >
      <h2 className="text-xl text-violet-500 font-semibold mb-5 mt-8 uppercase text-center">
        Create Character
      </h2>

      <div className="mb-5">
        <label
          htmlFor="name"
          className="block text-gray-100 text-sm font-bold mb-2"
        >
          Name
        </label>
        <input
          className="bg-neutral-800 shadow appearance-none rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          type="text"
          placeholder=""
          required
          value={name}
          onChange={onNameChange}
        />
      </div>

      <div className="mb-5">
        <select name="cars" id="cars">
          <option value="volvo">Volvo</option>
          <option value="saab">Saab</option>
          <option value="mercedes">Mercedes</option>
          <option value="audi">Audi</option>
        </select>
      </div>

      <div className="mb-5">
        <label
          htmlFor="backstory"
          className="block text-gray-100 text-sm font-bold mb-2"
        >
          Backstory
        </label>
        <textarea
          className="bg-neutral-800 shadow h-52 appearance-none rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline"
          id="backstory"
          placeholder=""
          maxLength={maxBackstoryLength}
          value={backstory}
          required
          onChange={handleBackstoryChange}
        ></textarea>
        <p className="text-gray-500 text-sm mt-2">
          Remaining characters: {backstoryCount}/{maxBackstoryLength}
        </p>
      </div>

      <div className="mb-5">
        {!isValidTraits && isSubmitted && (
          <p className="text-red-500">
            Enter traits separated by commas "Happy, Funny".
          </p>
        )}
        <label
          htmlFor="traits"
          className="block text-gray-100 text-sm font-bold mb-2"
        >
          Traits
        </label>
        <input
          className="bg-neutral-800 shadow appearance-none rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline"
          id="traits"
          type="text"
          placeholder=""
          required
          value={traits}
          onChange={onTraitsChange}
        />
      </div>

      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-violet-600 hover:bg-violet-500 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>

        <Link
          to="/dashboard"
          className="bg-violet-600 hover:bg-violet-500 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
        >
          CANCEL
        </Link>
      </div>
    </form>
  )
}

export default CharacterForm
