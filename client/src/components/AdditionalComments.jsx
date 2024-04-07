import { useContext } from "react";
import { StateContext } from "../App";

const AdditionalComments = () => {
  const {
    additionalComments,
    setAdditionalComments,
  } = useContext(StateContext);

  const handleAdditionalCommentsChange = (e) => {
    setAdditionalComments(e.target.value);
  };

  return (
    <div className="relative w-full">
      <div className="w-full p-3 bg-neutral-200 rounded-lg shadow-md items-center text-center flex flex-col gap-5">
        <h3 className="font-bold text-neutral-600">3. ADDITIONAL COMMENTS</h3>
        <textarea
          className="w-full px-2 rounded-md"
          placeholder="E.g. design intent and vision for the project."
          value={ additionalComments }
          onChange={ handleAdditionalCommentsChange }
        />
      </div>
    </div>
  );
};

export default AdditionalComments;
