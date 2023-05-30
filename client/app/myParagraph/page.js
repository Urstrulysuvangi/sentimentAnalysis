"use client";

import React, { useState } from "react";
import axios from "axios";
import Image from "next/image";
import Vader from "@/components/Vader";
import TextBlob from "@/components/TextBlob";
import Advanced from "@/components/Advanced";

function Page() {
  const [inputText, setInputText] = useState("");
  const [vaderChecked, setVaderChecked] = useState(true);
  const [textBlobChecked, setTextBlobChecked] = useState(false);
  const [advancedChecked, setAdvancedChecked] = useState(false);
  const [responseData, setResponseData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Send inputText and selected options to backend endpoint
    const options = {
      vader: vaderChecked,
      textBlob: textBlobChecked,
      advanced: advancedChecked,
    };

    let endpoint = "http://127.0.0.1:5000/myParagraph";
    if (vaderChecked) {
      endpoint += "Vader";
    } else if (textBlobChecked) {
      endpoint += "TextBlob";
    } else if (advancedChecked) {
      endpoint += "Advanced";
    }

    axios
      .post(endpoint, { text: inputText })
      .then((response) => {
        // Handle the response from the backend
        setResponseData(response.data);
        console.log(responseData);
      })
      .catch((error) => {
        // Handle error if any
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    if (name === "vader") {
      setVaderChecked(checked);
      setTextBlobChecked(false);
      setAdvancedChecked(false);
    } else if (name === "textBlob") {
      setTextBlobChecked(checked);
      setVaderChecked(false);
      setAdvancedChecked(false);
    } else if (name === "advanced") {
      setAdvancedChecked(checked);
      setVaderChecked(false);
      setTextBlobChecked(false);
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center text-4xl font-bold m-8">
        Enter any text here
      </div>
      {!isLoading && Object.keys(responseData).length === 0 && (
        <div className="flex justify-center items-center">
          <Image src="/news.png" width={500} height={500} alt="News" />
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="flex justify-center items-center"
      >
        <input
          type="text"
          value={inputText}
          onChange={handleInputChange}
          placeholder="Enter your search term"
          className="border border-gray-300 w-64 mx-10 p-2"
        />
        <div>
          <label>
            <input
              type="checkbox"
              name="vader"
              checked={vaderChecked}
              onChange={handleCheckboxChange}
            />
            Vader
          </label>
          <label>
            <input
              type="checkbox"
              name="textBlob"
              checked={textBlobChecked}
              onChange={handleCheckboxChange}
            />
            TextBlob
          </label>
          <label>
            <input
              type="checkbox"
              name="advanced"
              checked={advancedChecked}
              onChange={handleCheckboxChange}
            />
            Advanced
          </label>
        </div>
        <button type="submit" className="border bg-sky-900 text-white p-2">
          Analyze
        </button>
      </form>
      {vaderChecked && Object.keys(responseData).length > 0 && (
        <Vader data={responseData} />
      )}
      {textBlobChecked && Object.keys(responseData).length > 0 && (
        <TextBlob data={responseData} />
      )}
      {advancedChecked && Object.keys(responseData).length > 0 && (
        <Advanced data={responseData} />
      )}
    </div>
  );
}

export default Page;
