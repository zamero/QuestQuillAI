function Stripe() {
  const stripeOnClick = () => {
    fetch(`${import.meta.env.VITE_URI}create-checkout-session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: [
          { id: 1, quantity: 1 },
          { id: 2, quantity: 1 },
        ],
        email: localStorage.getItem("email"),
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
      <div className="flex items-center justify-center h-screen">
        <div className="bg-gray-900 text-white rounded-lg p-6 sm:p-8 max-w-7xl shadow-md">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">
            Choose a Subscription
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-gray-800 rounded-lg p-6 sm:p-8 flex flex-col items-center">
              <h3 className="text-lg sm:text-xl font-semibold mb-4">Basic</h3>
              <p className="text-gray-400 mb-4">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
              <p className="text-4xl sm:text-5xl font-bold mb-4">$9.99</p>
              <button className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-2 sm:px-6 sm:py-3">
                Select
              </button>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 sm:p-8 flex flex-col items-center">
              <h3 className="text-lg sm:text-xl font-semibold mb-4">Pro</h3>
              <p className="text-gray-400 mb-4">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
              <p className="text-4xl sm:text-5xl font-bold mb-4">$19.99</p>
              <button className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-2 sm:px-6 sm:py-3">
                Select
              </button>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 sm:p-8 flex flex-col items-center">
              <h3 className="text-lg sm:text-xl font-semibold mb-4">Premium</h3>
              <p className="text-gray-400 mb-4">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
              <p className="text-4xl sm:text-5xl font-bold mb-4">$29.99</p>
              <button className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-2 sm:px-6 sm:py-3">
                Select
              </button>
            </div>
          </div>
        </div>
      </div>
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
