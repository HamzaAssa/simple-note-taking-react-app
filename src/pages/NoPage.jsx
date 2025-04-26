import React from "react";
import { Link } from "react-router-dom";

const NoPage = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-2xl text-blue-900">Requested page doesn't exist</h1>
      <Link
        to="/"
        className="mt-2 hover:bg-blue-400 px-5 py-2 rounded-lg hover:text-white text-lg "
      >
        Go back to Home Page
      </Link>
    </div>
  );
};

export default NoPage;
