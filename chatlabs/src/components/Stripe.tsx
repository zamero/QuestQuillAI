import { Link } from "react-router-dom"
import { useState, useEffect } from "react"

function Stripe() {
  const stripeOnClick = () => {
    fetch("http://localhost:4000/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: [
          { id: 1, quantity: 1 },
          { id: 2, quantity: 1 },
        ],
      }),
    })
      .then(async (res) => {
        if (res.ok) return res.json()
        const json = await res.json()
        return await Promise.reject(json)
      })
      .then(({ url }) => {
        window.location = url
      })
      .catch((e) => {
        console.error(e.error)
      })
  }
  return (
    <>
      <button
        onClick={stripeOnClick}
        className="text-white flex items-center bg-violet-700 hover:bg-violet-600 rounded ml-3 p-1.5"
      >
        Checkout
      </button>
    </>
  )
}
export default Stripe
