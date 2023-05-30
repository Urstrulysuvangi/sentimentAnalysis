import React from "react";

function Vader({ data }) {
  return (
    <div className="p-4 bg-gray-200 rounded-md mt-4">
      <h2 className="text-xl font-bold mb-2">Vader Analysis Result</h2>
      <p>Subjectivity: {data.compound}</p>
      <p>Negativity: {data.neg}</p>
      <p>Subjectivity: {data.neu}</p>
      <p>Subjectivity: {data.pos}</p>
    </div>
  );
}

export default Vader;
