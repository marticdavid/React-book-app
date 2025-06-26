import React from 'react'
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-[73vh] w-full flex flex-col items-start justify-center  bg-gradient-to-r from-[#274B74] to-[#8233CF] via-[#E963FD]">
      <h1 className="text-3xl font-bold">Book Reservation</h1>
      <p className="text text-lg">
        Save your time and reserve your book today
      </p>
      <div className="flex justify-center  space-x-4 mt-4">
        <Link to="/Register">
          <button className="bg-primary-500 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded">
            Register
          </button>
        </Link>
        <Link to="/login">
          <button className="bg-primary-500 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded">
            Login
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Home
