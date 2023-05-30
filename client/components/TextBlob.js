import React from "react";

const TextBlob = ({ data }) => {
  return (
    <div>
      <div>
        <h2>TextBlob Analysis</h2>
        <p>Polarity: {data.sentiment}</p>
      </div>
    </div>
  );
};

export default TextBlob;
