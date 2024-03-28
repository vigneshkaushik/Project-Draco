import React from "react";

const PDFUpload = ({ onPDFUpload }) => (
  <div>
    <h3>Upload Project Brief (PDF)</h3>
    <input type="file" accept="application/pdf" onChange={onPDFUpload} />
  </div>
);

export default PDFUpload;
