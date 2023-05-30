"use client";

import { useState } from "react";
import axios from "axios";
import Image from "next/image";

const Page = () => {
  const [asin, setASIN] = useState("");
  const [responseData, setResponseData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [averagePolarity, setAveragePolarity] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post("http://127.0.0.1:5000/reviews", {
        asin,
      });
      const data = response.data;
      setResponseData(data);
      calculateAveragePolarity(data);
      setASIN("");
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const calculateAveragePolarity = (data) => {
    if (data.length > 0) {
      const totalPolarity = data.reduce(
        (sum, review) => sum + review.polarity_score,
        0
      );
      const average = totalPolarity / data.length;
      setAveragePolarity(average);
    } else {
      setAveragePolarity(0);
    }
  };

  return (
    <div className="overflow-hidden">
      <div className="flex justify-center items-center text-4xl font-bold m-8">
        Sentiment Analysis on Amazon Reviews
      </div>

      {!isLoading && responseData.length === 0 && (
        <div className="flex justify-center items-center">
          <Image src="/news.png" width={500} height={500} alt="News" />
        </div>
      )}

      <div>
        <form
          onSubmit={handleSubmit}
          className="flex justify-center items-center"
        >
          <label>
            Enter Product Key:
            <input
              type="text"
              value={asin}
              onChange={(e) => setASIN(e.target.value)}
              className="border border-gray-300 w-64 mx-10 p-2"
            />
          </label>
          <button type="submit" className="border bg-sky-900 text-white p-2">
            Submit
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
                  <p>Average Polarity: {averagePolarity.toFixed(2)}</p>
                </div>
              )}
              {responseData.map((review, index) => (
                <div key={index} className="border border-sky-600 p-4 m-4">
                  <h3 className="font-bold">Title: {review.review_title}</h3>
                  <p>
                    Sentiment: {review.sentiment} {review.emoji}
                  </p>
                  <p>Summary: {review.summary}</p>
                  <p>Polarity: {review.polarity_score}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
