import { BASE_URL } from "./baseURL";
import { commonAPI } from "./commonAPI";

//1. register api call
export const registerAPI = async(user)=>{
    return await commonAPI("post",`${BASE_URL}/userRegister`,user,"")
}

//2. login api call
export const loginAPI = async(user)=>{
    return await commonAPI("post",`${BASE_URL}/userLogin`,user,"")
}

