import { getToken } from "../lib/auth"
const myFetch = async (url: string, params: any) => {
    const token = getToken();
    if (token) {
        params.headers = {
            ...params.headers,
            Authorization: `Bearer ${token}`
        }
    }
    const data = await fetch(url, params);
    const res = await data.json();
    console.log(res);
    if (res && res.code === "401") {
        console.log('unauthorized')
        location.replace('/login');
    }
    if (res && +res.code >= 200 && +res.code <= 300) {
        return res;
    }
    throw new Error(res.error)
};

export default myFetch;