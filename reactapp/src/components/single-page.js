import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import Spinner from 'react-bootstrap/Spinner';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
export default function SinglePage(props) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1); //setting 1 to show fisrt page

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset) {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }
  //console.log(props);
  const { pdf } = props;
  //console.log(pdf);
  if(!pdf){
    return (
      <div class="d-flex align-items-center" style={{padding: "250px 550px"}}>
      <Spinner animation="grow" role="status" style={{ width: "10rem", height: "10rem" }}>
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      </div>
    );
  }
  else{
  return (
    <>
      <Document
        file={`${pdf}`}
        options={{ workerSrc: "/pdf.worker.js" }}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} />
      </Document>
      <div>
        <p>
          Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
        </p>
        <button type="button" disabled={pageNumber <= 1} onClick={previousPage}>
          Previous
        </button>
        <button
          type="button"
          disabled={pageNumber >= numPages}
          onClick={nextPage}
        >
          Next
        </button>
      </div>
    </>
  );
  }
}
