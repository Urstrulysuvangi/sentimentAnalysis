"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

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
              <div key={index} className="border border-sky-600 p-4 m-4 flex">
                <div className="flex-1">
                  <Link href={result.url}>
                    <h2>
                      {" "}
                      <span className="font-bold"> Title:</span>{" "}
                      <span className="text-sky-700">{result.title}</span>
                    </h2>
                  </Link>
                  <p className="text-justify">
                    {" "}
                    <span className="font-bold"> Summary: </span>{" "}
                    {result.summary}
                  </p>
                  <p>
                    {" "}
                    <span className="font-bold">Polarity Score: </span>{" "}
                    {result.sentiment}
                  </p>
                </div>
                <div className="w-1/3">
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={[
                          { name: "Negative", value: result.negative },
                          { name: "Neutral", value: result.neutral },
                          { name: "Positive", value: result.positive },
                        ]}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        label={({ name, percent }) =>
                          `${name} ${(percent * 100).toFixed(0)}%`
                        }
                      >
                        <Cell fill="#FF4136" />
                        <Cell fill="#0074D9" />
                        <Cell fill="#2ECC40" />
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsResults;
