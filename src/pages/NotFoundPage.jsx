import React from "react";
import { Link } from "react-router-dom";
const NotFoundPage = () => {

  return (
    <div className="w-full flex justify-center items-center text-7xl h-screen text-gray-700 ">
      Not Found <Link to='/admin/login'>Login</Link>
    </div>
  );
};

export default NotFoundPage;