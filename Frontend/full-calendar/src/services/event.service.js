import axios from "axios"
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export const getEvents = async() => {
    try {
        const res = await axios.get(`${BASE_URL}/getEvents`)
        return res.data
    } catch(err){
        return err.message
    }
}

export const postEvent = async(data) => {
    try {
        const res = await axios.post(`${BASE_URL}/postEvent`, data)
        return res.data
    } catch(err){
        return err.message
    }
}

export const updateEvent = async(data) => {
    try {
        const res = await axios.put(`${BASE_URL}/updateEvent`, data)
        console.log(res.data)
        return res.data
    } catch(err){
        return err.message
    }
}