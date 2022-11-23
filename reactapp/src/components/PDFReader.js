import React, { useState, useEffect } from "react";
import SinglePagePDFViewer from "./single-page";
import { useParams } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';
import FileService from "../services/file.service"

const PDFReader = (props) => {
  const [file, setFile] = useState("");
  const [fileData, setFileData] = useState("");
  let { id } = useParams();
  //console.log(id);
  useEffect(() => {
    const getPDF = async () => {  
        FileService.getPDFUrl(id).then(result => {
            FileService.getPDFString(result.data.url).then(response => {
              setFileData(`data:application/pdf;base64,${new Buffer(response.data, "binary").toString("base64")}`);
            })
            .catch((err) => {
              console.log('error');
            });
        })
        .catch((err) => {
          console.log('error');
        });
        
    };

    getPDF();
  }, []);
  if(!fileData){
    return (
      <div class="d-flex align-items-center" style={{padding: "250px 550px"}}>
      <Spinner animation="grow" variant="secondary" role="status" style={{ width: "10rem", height: "10rem" }}>
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      </div>
    );
  }
  else{
  return (
    <div className="single-page-container" style={{ marginLeft: "30%" }}>
      <SinglePagePDFViewer pdf={fileData} />
    </div>
  );
  }
};

export default PDFReader;
