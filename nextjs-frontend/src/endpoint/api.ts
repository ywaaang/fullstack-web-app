// 定义一个Fetch拦截器
import myFetch from './fetch';
import { Memo } from '../app/memo/types';

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

export const RegisterApi = (username: string, password: string, confirmpassword: string) => {
    return myFetch("http://localhost:3001/auth/register", {
        method: "POST",
        body: JSON.stringify({ username, password, confirmpassword }),
        headers: {
            "Content-Type": "application/json",
        },
        credentials: 'include'
    })
}

export const QueryMemoApi = (url: string) => {
    return myFetch(`http://localhost:3001${url}`, {
        method: "GET",
        credentials: 'include'
    })
}

export const CreateMemoApi = (memo: Memo) => {
    console.log(memo)
    return myFetch(`http://localhost:3001/memo`, {
        method: "POST",
        credentials: 'include',
        body: JSON.stringify(memo),
        headers: {
            "Content-Type": "application/json",
        },
    })
}

export const QueryMemoByIDApi = (id: Partial<Memo>) => {
    console.log(id)
    return myFetch(`http://localhost:3001/memo/${id}`, {
        method: "GET",
        credentials: 'include'
    })
}

export const DeleteMemoByIDApi = (id: Memo['id']) => {
    return myFetch(`http://localhost:3001/memo/${id}`, {
        method: "DELETE",
        credentials: 'include'
    })
}