import Lottie from "react-lottie-player";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import lottieJson from "../src/assets/lottie.json";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Steps from "./components/Steps";
import DashBoard2 from "./pages/db-2";
import DashBoard4 from "./pages/db-4";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<DashBoard2 />} />
          <Route path="/character" element={<DashBoard4 />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

function NotFound() {
  return (
    <section className="flex justify-center font-bold text-violet-500">
      <h1>404 - Page Not Found</h1>
    </section>
  );
}

function Home() {
  return (
    <>
      <section className="flex justify-center bg-neutral-950">
        <div className="w-full h-full md:max-w-2xl">
          <section className="flex flex-row justify-center my-20 md:flex-row">
            <div className="flex flex-col justify-center mr-32">
              <h1 className="text-6xl font-light uppercase text-slate-100">
                <span className="text-violet-500">Chat</span> Labs
              </h1>
              <p className="my-2 text-2xl font-semibold uppercase text-slate-100">
                Creating characters <br /> that come to{" "}
                <span className="text-violet-500">life</span>
              </p>
            </div>
            <div className="relative hidden sm:block h-96 ">
              <img
                className="object-cover w-full h-full transition duration-300 shadow-lg animate-pulse shadow-violet-500/100 rounded-xl"
                src="https://image.lexica.art/full_jpg/a868d5f3-410e-4102-a1c2-a240306eae0f"
                alt=""
              />
              <img
                className="absolute top-0 left-0 object-cover w-full h-full rounded-xl"
                src="https://image.lexica.art/full_jpg/a868d5f3-410e-4102-a1c2-a240306eae0f"
                alt=""
              />
              <Lottie
                loop
                animationData={lottieJson}
                play
                className="absolute left-0 object-cover w-full h-full top-24 rounded-xl"
              />
            </div>
          </section>
        </div>
      </section>
      <div className="relative w-full">
        <svg
          className="absolute inset-0 z-10 w-full -translate-y-12"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#0a0a0a"
            fill-opacity="1"
            d="M0,128L1440,64L1440,0L0,0Z"
          ></path>
        </svg>
      </div>
      <section className="flex justify-center bg-neutral-900 mt-28">
        <section className="flex justify-center px-0 sm:px-5">
          <div className="w-full md:max-w-2xl">
            <div className="flex flex-col items-center my-20 md:flex-row">
              <div className="flex flex-col items-start justify-center order-1 max-w-md pr-0 md:pr-16">
                <div className="flex h-auto my-3 justify-self-start">
                  <div className="w-1 mr-5 bg-violet-500"></div>
                  <h2 className="py-3 mx-auto text-xl font-semibold text-slate-100 md:mx-0">
                    Level Up Your NPC Interaction
                  </h2>
                </div>
                <p className="px-5 text-slate-100 text-md md:px-0">
                  Gone are the days of static and scripted{" "}
                  <span className="text-violet-500">NPC responses</span>. With
                  Chat Labs, you'll experience a new level of interaction that's
                  tailored to your every move. Our system listens to the{" "}
                  <span className="text-violet-500">players dialogue</span> and
                  responds in <span className="text-violet-500">real-time</span>{" "}
                  with{" "}
                  <span className="text-violet-500">
                    dynamic and engaging dialogue
                  </span>{" "}
                  that makes your game world feel alive.
                </p>
              </div>
              <div className="object-cover w-7/12 h-full transition duration-300 shadow-lg rounded-xl md:order-2 sm:w-1/2 shadow-violet-500/20 hover:shadow-violet-500/75">
                <img
                  className="rounded-xl "
                  src="https://image.lexica.art/full_jpg/985c586b-8dc0-4031-9894-51fdfa775dbf"
                  alt=""
                />
              </div>
            </div>
          </div>
        </section>
      </section>
      <section className="flex justify-center bg-neutral-900">
        <section className="flex justify-center px-0 sm:px-5">
          <div className="w-full md:max-w-2xl">
            <div className="flex flex-col items-center my-20 md:flex-row">
              <div className="object-cover w-7/12 h-full transition duration-300 shadow-lg rounded-xl md:order-1 sm:w-1/2 shadow-amber-200/20 hover:shadow-amber-200/75">
                <img
                  className="rounded-xl "
                  src="https://image.lexica.art/full_jpg/ac0efe10-c183-474b-90ef-2d03446dc355"
                  alt=""
                />
              </div>
              <div className="flex flex-col items-start justify-center order-1 max-w-md pr-0 md:pl-16">
                <div className="flex h-auto my-3 justify-self-start">
                  <div className="order-1 w-1 ml-5 bg-violet-500"></div>
                  <h2 className="py-3 mx-auto text-xl font-semibold text-slate-100 md:mx-0">
                    Inclusive Gaming with{" "}
                    <span className="text-violet-500">Chat Labs</span>
                  </h2>
                </div>
                <p className="px-5 text-slate-100 text-md md:px-0">
                  With <span className="text-violet-500">Chat Labs</span>, you
                  can create more{" "}
                  <span className="text-violet-500">inclusive and diverse</span>{" "}
                  gaming experiences. Our AI generates responses in multiple
                  languages and accents, welcoming players from all over the
                  world. Plus, our technology can be customized to reflect
                  different cultures and identities, making the game world more{" "}
                  <span className="text-violet-500">
                    representative and inviting
                  </span>
                  . By incorporating{" "}
                  <span className="text-violet-500">Chat Labs</span> into your
                  game development, you're not just creating a more immersive
                  gaming experience, but also a more{" "}
                  <span className="text-violet-500">inclusive</span> one.
                </p>
              </div>
            </div>
          </div>
        </section>
      </section>
      <Steps />
      <Footer />
    </>
  );
}

export default App;
