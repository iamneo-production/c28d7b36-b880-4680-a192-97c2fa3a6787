import http from "../http-common";
import axios from "axios";
import authHeader from "/home/coder/project/workspace/reactapp/src/services/auth-header";

class UploadFilesService {
  upload(file, appId, onUploadProgress) {
    console.log(appId);
    let formData = new FormData();
    //let appId = "1";
    formData.append("application", appId)
    formData.append("file", file);
    // Object.keys(file).forEach(key => formData.append(key, file[key]));
    // formData.append('key1', 'value1');
    // formData.append('key2', 'value2');
    for (const value of formData.values()) {
        console.log(value);
      }
   return axios.post('https://8080-eaefecbbedccdfdcecbdadebcceedbabdbccfcfb.examlyiopb.examly.io/api/file/upload', formData, {
        headers: authHeader(),
        onUploadProgress,
           
});
  }

  getFiles() {
    return axios.get('https://8080-eaefecbbedccdfdcecbdadebcceedbabdbccfcfb.examlyiopb.examly.io/api/file/list',  {
      headers: authHeader()         
      });
  }
}

export default new UploadFilesService();