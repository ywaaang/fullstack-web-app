// 定义一个Fetch拦截器
import myFetch from './fetch';

export const LoginApi = (username: string, password: string) => {
    return myFetch("http://localhost:3001/auth/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: {
            "Content-Type": "application/json",
        },
        credentials: 'include'
    })
}

export const CheckAuthApi = (params: any) => {
    return myFetch("http://localhost:3001/auth", {
        method: "GET",
        credentials: 'include'
    })
}


