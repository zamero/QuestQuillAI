import { CheckCircleIcon } from "@heroicons/react/24/solid"
import { useState } from "react"

const steps = [
  {
    name: "Create account",
    href: "#a",
    status: "complete",
    text: "Navigate to create account page and register",
    image:
      "https://lh3.googleusercontent.com/drive-viewer/AFGJ81ofj4jbbmpgLMiG5dHCp-dZUYgENRoDG_uEuBDKqrz91pylS8N5Y_3DNqeDHQsg15cRoixNJuwXaGVxPaUpl5WJ3zBmwg=s2560",
  },
  {
    name: "Go to dashboard",
    href: "#a",
    status: "current",
    text: 'Go to dashboard and click on "Create Character"',
    image:
      "https://lh3.googleusercontent.com/drive-viewer/AFGJ81rfHdKCU1-A0lAx-FiQvy3ILreGZ63CBahit43PZq3TuajOAXSf7myO6-Q1Ul3g-hJikpBDSlXH_4qtfCoYRh2tXp1K=s1600",
  },
  {
    name: "Describe the characters",
    href: "#a",
    text: "Describe the characters personality traits & backstory",
    status: "upcoming",
    image:
      "https://lh3.googleusercontent.com/drive-viewer/AFGJ81pUhB32BEJFtY6doNq9im_A0ovCtAcyoyd8zboDjUYXQygc6GPG0facuLW6T3FyHMhZyBA3X96QyF1S_o_XjPkPEg9F6Q=s1600",
  },
  {
    name: "Use our API",
    href: "#a",
    text: "Use our API to connect to your character ingame (See docs)",
    status: "upcoming",
    image:
      "https://lh3.googleusercontent.com/drive-viewer/AFGJ81owmtxRpyzODUqZ89lYBoB9CpgyrZbvuiCoAsxagFAszx-zLuChZPiGah9p47ElHHcL1a4tFGeDQFcWch9lCOQtwskE5Q=s1600",
  },
]

function Steps() {
  const [activeStep, setActiveStep] = useState(0)

  const handleStepClick = (index: any) => {
    setActiveStep(index)
  }
  const updatedSteps = steps.map((step, index) => {
    if (index < activeStep) {
      return { ...step, status: "complete" }
    } else if (index === activeStep) {
      return { ...step, status: "current" }
    } else {
      return { ...step, status: "upcoming" }
    }
  })
  return (
    <div className="flex justify-center min-h-400">
      <div className="sm:scale-125 scale-100 py-10 px-4 sm:p-10 lg:px-8 flex flex-col md:flex-row justify-center bg-gradient-to-r shadow-neutral-950 from-neutral-900 to-neutral-950 md:to-violet-950 rounded-3xl max-w-screen-lg md:m-16">
        <nav
          className="flex justify-center items-center sm:mr-8"
          aria-label="Progress"
        >
          <ol role="list" className=" w-52">
            {updatedSteps.map((step, index) => (
              <li key={step.name}>
                {step.status === "complete" ? (
                  <a
                    href={step.href}
                    className="group"
                    onClick={() => handleStepClick(index)}
                  >
                    <span className="flex m-2 p-3 rounded-xl items-center bg-neutral-900">
                      <span className="flex-shrink-0 relative h-5 w-5 flex items-center justify-center">
                        <CheckCircleIcon
                          className="h-full w-full text-violet-500"
                          aria-hidden="true"
                        />
                      </span>
                      <span className="ml-3 text-xl font-medium text-slate-100">
                        {step.name}
                      </span>
                    </span>
                  </a>
                ) : step.status === "current" ? (
                  <a
                    href={step.href}
                    className="flex m-2 p-3 rounded-xl items-center bg-neutral-900"
                    aria-current="step"
                    onClick={() => handleStepClick(index)}
                  >
                    <span
                      className="flex-shrink-0 h-5 w-5 relative flex items-center justify-center"
                      aria-hidden="true"
                    >
                      <span className="absolute h-5 w-5 rounded-full bg-indigo-200" />
                      <span className="relative block w-3 h-3 bg-violet-500 rounded-full" />
                    </span>
                    <span className="ml-3 text-xl font-medium text-violet-500">
                      {step.name}
                    </span>
                  </a>
                ) : (
                  <a
                    href={step.href}
                    className="group"
                    onClick={() => handleStepClick(index)}
                  >
                    <div className="flex m-2 p-3 rounded-xl items-center bg-neutral-900">
                      <div
                        className="flex-shrink-0 h-5 w-5 relative flex items-center justify-center"
                        aria-hidden="true"
                      >
                        <div className="h-3 w-3 bg-slate-100 rounded-full" />
                      </div>
                      <p className="ml-3 text-xl font-medium text-slate-100">
                        {step.name}
                      </p>
                    </div>
                  </a>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <div className="flex flex-col justify-center items-center">
          <h2 className="text-slate-100 text-2xl pb-5 md:px-0 max-w-96 sm:w-96">
            {" "}
            {steps[activeStep].text}{" "}
          </h2>
          <img
            className="w-96 rounded-xl"
            src={steps[activeStep].image}
            alt=""
          />
        </div>
      </div>
    </div>
  )
}
export default Steps
