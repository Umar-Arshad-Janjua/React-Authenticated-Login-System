import React, { useState, useEffect } from "react";
import MKDSDK from "../utils/MkdSDK";

const sdk = new MKDSDK();

const AdminDashboardPage = () => {
  const [videos, setVideos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      sdk.setTable("video");
      const result = await sdk.callRestAPI(
        { payload: {}, page: currentPage, limit: 10 },
        "PAGINATE"
      );
      setVideos(result.data);
      setIsLoading(false);
    };

    fetchData();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleLogout = () => {
    sdk.logout();
  };
  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>App</h1>
      <button onClick={handleLogout}>Logout</button>
      <ul>
        {videos.map((video) => (
          <li key={video.id}>{video.name}</li>
        ))}
      </ul>
      <div>
        <button onClick={() => handlePageChange(currentPage - 1)}>
          Prev
        </button>
        <button onClick={() => handlePageChange(currentPage + 1)}>
          Next
        </button>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
