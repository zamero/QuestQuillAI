import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  const [userData, setUserData] = useState<any[]>([]);
  const [rerenderFlag, setRerenderFlag] = useState(false);

  const deleteCharacter = async (index: number) => {
    const response = await fetch(
      `https://chatlabs.up.railway.app/delete/${localStorage.getItem(
        "userId"
      )}/${index}`,
      { method: "delete" }
    );
    const res = await response.json();
    console.log(res);
    console.log("Character successfully deleted");
    // Rerender
    setRerenderFlag((prevFlag) => !prevFlag);
  };

  useEffect(() => {
    fetch(
      `https://chatlabs.up.railway.app/characters/${localStorage.getItem(
        "userId"
      )}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUserData(data.characters);
      });
  }, [rerenderFlag]);

  return (
    <>
      <section className="flex justify-center mx-3">
        <div className="flex flex-col w-3xl justify-center">
          <div className="my-10 flex flex-row md:flex-row justify-center">
            <h1 className="justify-center my-2 text-4xl font-semibold uppercase text-violet-500">
              Characters
            </h1>
          </div>

          <>
            {userData &&
              userData.map((character: any, index: number) => {
                const truncateText = (text: string, limit: number) => {
                  const words = text.split(" ");
                  if (words.length > limit) {
                    return words.slice(0, limit).join(" ") + "...";
                  }
                  return text;
                };

                return (
                  <>
                    <Link to="/character" state={{ index: `${index}` }}>
                      <div className="grid grid-cols-1 gap-4 p-1 my-2 rounded-xl shadow-lg hover:shadow-violet-500/40 transition duration-300">
                        <div
                          className="grid grid-cols-8 gap-6 bg-neutral-950 text-neutral-100 py-2 px-4 rounded-md"
                          key={character._id}
                        >
                          <div className="col-span-2">
                            <div className="flex flex-col">
                              <h3 className="text-violet-500 uppercase ">
                                Name
                              </h3>

                              <p className="text-slate-100 text-md px-5 md:px-0">
                                {truncateText(character.name, 2)}
                              </p>
                            </div>
                          </div>

                          <div className="col-span-2">
                            {character.traits && (
                              <div className="flex flex-col">
                                <h3 className="text-violet-500 uppercase ">
                                  Traits
                                </h3>

                                <p className="text-slate-100 text-md px-5 md:px-0">
                                  {truncateText(character.traits, 2)}
                                </p>
                              </div>
                            )}
                          </div>

                          <div className="col-span-2">
                            {character.backstory && (
                              <div className="flex flex-col">
                                <h3 className="text-violet-500 uppercase ">
                                  Backstory
                                </h3>

                                <p className="text-slate-100 text-md px-5 md:px-0">
                                  {truncateText(character.backstory, 2)}
                                </p>
                              </div>
                            )}
                          </div>

                          <div className="col-span-8 md:col-span-1 md:col-start-8 flex justify-center items-center">
                            <div className="grid grid-cols-1 gap-2">
                              <button className="px-2 bg-violet-700 rounded-md p-1 m-1 hover:opacity-70">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  className="w-6 h-6"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                                  />
                                </svg>
                              </button>
                            </div>
                            <div className="grid grid-cols-1 gap-2">
                              <button
                                onClick={(event) => {
                                  deleteCharacter(index);
                                  event.preventDefault();
                                }}
                                className="px-2 bg-violet-700 rounded-md p-1 m-1 hover:opacity-70"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  className="w-6 h-6"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </>
                );
              })}
          </>

          <div className="flex flex-col p-2 my-12 md:w-72 border-l-4 border-violet-500">
            <Link to="/create">
              <button
                role="button"
                className="bg-violet-600 hover:bg-violet-500 rounded-md py-2 px-4 font-semibold text-slate-100 uppercase cursor-pointer"
              >
                Create character
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
export default Dashboard;
