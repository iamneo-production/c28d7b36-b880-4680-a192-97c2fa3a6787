import axios from "axios";
import authHeader from "/home/coder/project/workspace/reactapp/src/services/auth-header";

class ApplicationService{
    listApplications(){
        return axios.get(`https://8080-eaefecbbedccdfdcecbdadebcceedbabdbccfcfb.examlyiopb.examly.io/api/app/list`, { headers: authHeader() })
    }

    getUserId(){
        return axios.get(`https://8080-eaefecbbedccdfdcecbdadebcceedbabdbccfcfb.examlyiopb.examly.io/api/auth/id`, { headers: authHeader() })
    }
    apply(appData){
        return axios.post('https://8080-eaefecbbedccdfdcecbdadebcceedbabdbccfcfb.examlyiopb.examly.io/api/app/apply', appData, { headers: authHeader()});
    }
    addrApply(addrData){
        return axios.post('https://8080-eaefecbbedccdfdcecbdadebcceedbabdbccfcfb.examlyiopb.examly.io/api/address/apply', addrData, { headers: authHeader()});
    }
    listByUserId(userId){
        try {
            let res = axios.get(`https://8080-eaefecbbedccdfdcecbdadebcceedbabdbccfcfb.examlyiopb.examly.io/api/app/list/user/${userId}`, { headers: authHeader() })
            return res;
        } catch(error){
            console.log(error.response);
        }
    }
    updateStatus(appId, status){
        return axios.put(`https://8080-eaefecbbedccdfdcecbdadebcceedbabdbccfcfb.examlyiopb.examly.io/api/app/edit/status/${appId}`,status, { headers: {'Content-Type': 'text/plain', 'Authorization': `${authHeader().Authorization}`} })
    }
    fetchById(id){
        return axios.get(`https://8080-eaefecbbedccdfdcecbdadebcceedbabdbccfcfb.examlyiopb.examly.io/api/app/fetch/${id}`, { headers: authHeader() })
    }
    fetchAddressByApplicationId(id){
        return axios.get(`https://8080-eaefecbbedccdfdcecbdadebcceedbabdbccfcfb.examlyiopb.examly.io/api/address/list/app/${id}`, { headers: authHeader() })
    }
}

export default new ApplicationService();