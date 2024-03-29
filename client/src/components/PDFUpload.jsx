import React from "react";

const PDFUpload = () => {
  const handlePDFUpload = (event) => {
    const file = event.target.files[0];
    console.log(file);
  };

  return (
    <div>
      <h3>Upload Project Brief (PDF)</h3>
      <input type="file" accept="application/pdf" onChange={handlePDFUpload} />
    </div>
  );
};

export default PDFUpload;
