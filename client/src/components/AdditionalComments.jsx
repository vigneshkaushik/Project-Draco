import React, { useContext } from "react";
import { StateContext } from "../App";

const AdditionalComments = () => {
  const { commentsVisible, additionalComments, setAdditionalComments } =
    useContext(StateContext);

  if (!commentsVisible) return null;

  return (
    <div>
      <h3>Additional Comments</h3>
      <textarea
        placeholder="Add any additional comments here"
        value={additionalComments}
        onChange={(e) => setAdditionalComments(e.target.value)}
      />
    </div>
  );
};

export default AdditionalComments;
