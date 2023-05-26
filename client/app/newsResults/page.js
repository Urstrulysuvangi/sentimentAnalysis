"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";

const NewsResults = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [responseData, setResponseData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [averageSentiment, setAverageSentiment] = useState(0);

  const handleSearch = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Send search term to Flask backend
    axios
      .post("http://127.0.0.1:5000/newsSearch", { searchTerm })
      .then((response) => {
        // Handle the response from the backend
        setResponseData(response.data);
        calculateAverageSentiment(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
        setIsLoading(false);
      });
  };

  const calculateAverageSentiment = (data) => {
    if (data.length > 0) {
      const totalSentiment = data.reduce(
        (sum, result) => sum + result.sentiment,
        0
      );
      const average = totalSentiment / data.length;
      setAverageSentiment(average);
    } else {
      setAverageSentiment(0);
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center text-4xl font-bold m-8">
        Sentiment analysis on News Articles
      </div>
      {!isLoading && responseData.length === 0 && (
        <div className="flex justify-center items-center">
          <Image src="/news.png" width={500} height={500} alt="News" />
        </div>
      )}
      <form
        onSubmit={handleSearch}
        className="flex justify-center items-center"
      >
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter your search term"
          className="border border-gray-300  w-64 mx-10 p-2"
        />
        <button type="submit" className="border bg-sky-900 text-white p-2">
          Search
        </button>
      </form>
      {/* Results */}
      <div>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div>
            {responseData.length > 0 && (
              <div className="flex justify-center items-center mt-4">
                <p>Average Sentiment: {averageSentiment.toFixed(2)}</p>
              </div>
            )}
            {responseData.map((result, index) => (
              <div key={index} className="border border-sky-600 p-4 m-4">
                <h2 className="font-black">Title: {result.title}</h2>
                <p>Summary: {result.summary}</p>
                <p>Polarity Score: {result.sentiment}</p>
                <p>Read More: {result.url}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsResults;
