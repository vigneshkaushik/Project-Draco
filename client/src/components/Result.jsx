import { useContext, useEffect, useState } from "react";
import { StateContext } from "../App";
import Loader from "./Loader";

function parseWithHeaders(text) {
  const paragraphs = [];
  const pattern = /\*\*(.*?)\*\*/g;
  let lastIndex = 0;
  let lastHeader = "";
  let match;

  // Find all matches of text enclosed within **
  while ((match = pattern.exec(text)) !== null) {
    // Push the paragraph content before the current match
    const contentBeforeMatch = text.substring(lastIndex, match.index).trim();
    if (contentBeforeMatch) {
      paragraphs.push({ header: lastHeader, content: contentBeforeMatch });
      // lastContent = contentBeforeMatch;
    }
    lastHeader = match[1].trim();
    // Update the last index to start searching from after the current match
    lastIndex = pattern.lastIndex;
  }

  // If there's remaining text after the last match, push it as a paragraph
  const remainingContent = text.substring(lastIndex).trim();
  if (remainingContent) {
    paragraphs.push({ header: lastHeader, content: remainingContent });
  }

  return paragraphs;
}

const ParsedTextRenderer = ({ parsedText }) => {
  return (
    <div>
      { parsedText.map((item, index) => (
        <div key={ index } className="overflow-auto">
          { item.header && <h3 className="font-bold text-fuchsia-600 text-left w-full py-2">{ item.header }</h3> }
          <p className="text-white">{ item.content }</p>
        </div>
      )) }
    </div>
  );
};

const Result = () => {
  const { createdNarrative, narrativeGeneration, setNarrativeGeneration } =
    useContext(StateContext);

  const [parsedText, setParsedText] = useState("");
  useEffect(() => {
    if (createdNarrative) {
      setNarrativeGeneration(false);
      const parsed = parseWithHeaders(createdNarrative);
      setParsedText(parsed);
    }
  }, [createdNarrative]);

  return (
    <div className="w-full h-full flex flex-col overflow-auto bg-black bg-opacity-60 p-4 pt-2 mt-1">
      <h1 className="font-bold  text-left w-full text-xl text-white">Narrative</h1>
      { narrativeGeneration ? (
        <div className="flex flex-grow items-center justify-center">
          <Loader />
        </div>
      ) : parsedText ? (
        <ParsedTextRenderer parsedText={ parsedText } />
      ) : (
        <div className="flex flex-grow items-center justify-center">
          <p className="text-center text-white">No narrative generated</p>
        </div>
      ) }
    </div>
  );
};

export default Result;
