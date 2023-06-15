import { useState } from "react";
import { useNavigate } from "react-router-dom";

function FormModal({
  closeFormModal,
  data,
}: {
  closeFormModal: (arg0: boolean) => void;
  data: number;
}) {
  console.log(data);

  const [initialForm, setInitialForm] = useState({
    name: "",
    backstory: "",
    traits: "",
    voice: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  function handleFormChange(
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setInitialForm({ ...initialForm, [event.target.id]: event.target.value });

    if (event.target.id === "backstory") {
      updateBackstoryCount(event.target.value);
    }
  }

  function validateTraits(traits: string): boolean {
    const trimmedTraits = traits.trim();
    const traitsArray = trimmedTraits.split(",").map((trait) => trait.trim());
    return traitsArray.every((trait) => trait !== "" && !trait.includes(" "));
  }

  async function updateCharacter(index: number) {
    const isValidTraits = validateTraits(initialForm.traits);

    if (!isValidTraits) {
      setIsSubmitted(true);
      return;
    }

    await fetch(
      `http://localhost:4000/edit/${localStorage.getItem("userId")}/${index}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: initialForm.name,
          voice: initialForm.voice,
          backstory: initialForm.backstory,
          traits: initialForm.traits,
        }),
      }
    );
    navigate("/dashboard");
  }

  const navigate = useNavigate();

  const [backstoryCount, setBackstoryCount] = useState(
    3000 - initialForm.backstory.length
  );

  const updateBackstoryCount = (value: string): void => {
    const remainingCharacters = 3000 - value.length;
    setBackstoryCount(remainingCharacters);
  };
  console.log(handleFormChange);
  return (
    <div className="fixed inset-0 z-10 bg-neutral-950 bg-opacity-25 backdrop-blur-sm">
      <div className="flex justify-center mt-14">
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl shadow-lg shadow-violet-500/100 transition duration-300">
          <form className="bg-neutral-950 rounded-xl shadow-lg p-10">
            <h2 className="text-xl text-violet-500 font-semibold mb-5 mt-8 uppercase text-center">
              Edit Character
            </h2>

            <div className="mb-5">
              <label
                htmlFor="name"
                className="block text-gray-100 text-sm font-bold mb-2"
              >
                Name
              </label>
              <input
                onChange={handleFormChange}
                id="name"
                className="bg-neutral-800 shadow appearance-none rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder=""
                required
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="voice"
                className="block text-gray-100 text-sm font-bold mb-2"
              >
                Voice
              </label>
              <select
                className="bg-neutral-800 shadow appearance-none rounded w-1/2 py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline"
                name="voice"
                id="voice"
                onChange={handleFormChange}
              >
                <option value="21m00Tcm4TlvDq8ikWAM">Rachel</option>
                <option value="AZnzlk1XvdvUeBnXmlld">Domi</option>
                <option value="EXAVITQu4vr4xnSDxMaL">Bella</option>
                <option value="ErXwobaYiN019PkySvjV">Antoni</option>
                <option value="MF3mGyEYCl7XYWbV9V6O">Elli</option>
                <option value="TxGEqnHWrfWFTfGW9XjX">Josh</option>
                <option value="VR6AewLTigWG4xSOukaG">Arnold</option>
                <option value="pNInz6obpgDQGcFmaJgB">Adam</option>
                <option value="yoZ06aMxZJJ28mfd3POQ">Sam</option>
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
                onChange={handleFormChange}
                id="backstory"
                className="bg-neutral-800 h-52 shadow appearance-none rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline"
                placeholder=""
                required
                maxLength={3000}
              ></textarea>
              <p className="text-gray-500 text-sm mt-2">
                Remaining characters: {backstoryCount}/3000
              </p>
            </div>

            <div className="mb-5">
              {!validateTraits(initialForm.traits) && isSubmitted && (
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
                onChange={handleFormChange}
                id="traits"
                className="bg-neutral-800 shadow appearance-none rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder=""
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <button
                onClick={() => closeFormModal(false)}
                className="bg-violet-600 hover:bg-violet-500 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                type="button"
              >
                CANCEL
              </button>

              <button
                onClick={() => updateCharacter(data)}
                className="bg-violet-600 hover:bg-violet-500 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                type="button"
              >
                EDIT
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FormModal;
