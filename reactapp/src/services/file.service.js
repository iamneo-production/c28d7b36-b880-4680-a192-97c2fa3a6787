import axios from "axios";
import authHeader from "/home/coder/project/workspace/reactapp/src/services/auth-header";

class FileService{
    getImageUrl(id){
        return axios.get(`https://8080-eaefecbbedccdfdcecbdadebcceedbabdbccfcfb.examlyiopb.examly.io/api/file/list/app/img/?id=${id}`, { headers: authHeader() });
                 
    }

    getImageString(url){
        return axios.get(`${url}`, { headers: {'Authorization': `${authHeader().Authorization}`} , responseType: "arraybuffer"});
    }

    getPDFUrl(id){
        return axios.get(`https://8080-eaefecbbedccdfdcecbdadebcceedbabdbccfcfb.examlyiopb.examly.io/api/file/list/app/pdf/?id=${id}`, { headers: authHeader() });
                 
    }

    getPDFString(url){
        return axios.get(`${url}`, { headers: {'Authorization': `${authHeader().Authorization}`} , responseType: "arraybuffer"});
    }
}

export default new FileService();