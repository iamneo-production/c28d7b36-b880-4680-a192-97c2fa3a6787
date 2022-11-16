import React, { Component } from "react";
import UploadService from "../services/upload-files.service";

export default class UploadFiles extends Component {
  constructor(props) {
    super(props);
    this.selectFile1 = this.selectFile1.bind(this);
    this.selectFile2 = this.selectFile2.bind(this);
    this.upload = this.upload.bind(this);
    
    this.state = {
      selectedFiles1: undefined,
      selectedFiles2: undefined,
      currentFile1: undefined,
      currentFile2: undefined,
      progress1: 0,
      progress2: 0,
      message1: "",
      message2: "",
      appId: "",
      fileInfos: [],
    };
  }

  componentDidMount() {
    UploadService.getFiles().then((response) => {
      this.setState({
        fileInfos: response.data,
      });
    });
    //console.log(this.state.fileInfos);
    const application = JSON.parse(localStorage.getItem("application"));
    //console.log(application);
  }

  selectFile1(event) {
    //console.log(event.target.files[0].type);
    if(event.target.files[0].type == "image/jpeg"){
      this.setState({
        selectedFiles1: event.target.files,
        message1: "",
      });
    }
    else{
      //console.log("bad");
      this.setState({
        selectedFiles1: undefined,
        message1: "Incorrect file type uploaded, please upload again."
      })
    }
  }
  selectFile2(event) {
    if(event.target.files[0].type == "application/pdf"){
      this.setState({
        selectedFiles2: event.target.files,
        message2: "",
      });
    }
    else{
      //console.log("bad");
      this.setState({
        selectedFiles2: undefined,
        message2: "Incorrect file type uploaded, please upload again."
      })
    }
  }

  upload() {
    let currentFile1 = this.state.selectedFiles1[0];
    let currentFile2 = this.state.selectedFiles2[0];
    let application = JSON.parse(localStorage.getItem("application"));
    //let application=13;
    //console.log(currentFile1);
    //console.log(currentFile2);
    //console.log(this.state.fileInfos);
    this.setState({
      progress1: 0,
      progress2: 0,
      currentFile1: currentFile1,
      currentFile2: currentFile2,
      appId: application,
    });
    //console.log(application);
    UploadService.uploadImg(currentFile1, application, (event) => {
      this.setState({
        progress1: Math.round((100 * event.loaded) / event.total),
      });
    })
      .then((response) => {
        this.setState({
          message1: response.data.message,
        });
        return UploadService.getFiles();
      })
      .then((files) => {
        this.setState({
          fileInfos: files.data,
        });
      })
      .catch(() => {
        this.setState({
          progress1: 0,
          message1: "Could not upload the file!",
          currentFile1: undefined,
        });
      });

      UploadService.uploadPDF(currentFile2, application, (event) => {
        this.setState({
          progress2: Math.round((100 * event.loaded) / event.total),
        });
      })
        .then((response) => {
          this.setState({
            message2: response.data.message,
          });
          return UploadService.getFiles();
        })
        .then((files) => {
          this.setState({
            fileInfos: files.data,
          });
        })
        .catch(() => {
          this.setState({
            progress2: 0,
            message2: "Could not upload the file!",
            currentFile2: undefined,
          });
        });

    this.setState({
      selectedFiles1: undefined,
      selectedFiles2: undefined,
    });
  }

  render() {
    const {
      selectedFiles1,
      selectedFiles2,
      currentFile1,
      currentFile2,
      progress1,
      progress2,
      message1,
      message2,
      fileInfos,
    } = this.state;
    // if(this.state.fileInfos[0])
    //   //console.log(this.state.fileInfos[0]);
    return (
      <div>
        <div>
        <h3>Upload Photo of JPEG file format, max size 10MB</h3>
          <label className="btn btn-default">
            <input type="file" onChange={this.selectFile1} />
          </label>
          <br/>
          {currentFile1 && (
            <div className="progress">
              <div
                className="progress-bar progress-bar-info progress-bar-striped"
                role="progressbar"
                aria-valuenow={progress1}
                aria-valuemin="0"
                aria-valuemax="100"
                style={{ width: progress1 + "%" }}
              >
                {progress1}%
              </div>
            </div>
          )}
          <br/>
          <div className="alert alert-light" role="alert">
            {message1}
          </div>

        </div>
        <br/><br/><br/>
        <div>
          <h3>Upload ID Proof of PDF file format, max size 10MB</h3>
          <label className="btn btn-default">
            <input type="file" onChange={this.selectFile2} />
          </label>
          <br/>
          {currentFile2 && (
            <div className="progress">
              <div
                className="progress-bar progress-bar-info progress-bar-striped"
                role="progressbar"
                aria-valuenow={progress2}
                aria-valuemin="0"
                aria-valuemax="100"
                style={{ width: progress2 + "%" }}
              >
                {progress2}%
              </div>
            </div>
          )}
          <br/>
          <div className="alert alert-light" role="alert">
            {message2}
          </div>
        </div>
        <button
          className="btn btn-success"
          disabled={!selectedFiles1 || !selectedFiles2}
          onClick={this.upload}
        >
          Upload
        </button>
      </div>
    );
  }
}