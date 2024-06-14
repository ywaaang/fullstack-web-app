// 定义一个Fetch拦截器
import myFetch from '.';
import { Memo as MemoType } from '../app/memo/types';
import { baseUrl } from '../common/env';

export const QueryMemoApi = (params: any) => {
    return myFetch(baseUrl + `/memo/list`, {
        method: "Get",
        credentials: 'include',

    })
}

export const CreateMemoApi = (memo: MemoType) => {
    return myFetch(baseUrl + `/memo/create`, {
        method: "POST",
        credentials: 'include',
        body: JSON.stringify(memo),
        headers: {
            "Content-Type": "application/json",
        },
    })
}

export const QueryMemoByIDApi = (id: MemoType['id']) => {
    return myFetch(baseUrl + `/memo/${id}`, {
        method: "GET",
        credentials: 'include'
    })
}

export const DeleteMemoByIDApi = (id: MemoType['id']) => {
    return myFetch(baseUrl + `/memo/${id}`, {
        method: "DELETE",
        credentials: 'include'
    })
}

export const EditMemoByIDApi = (memo: MemoType) => {
    return myFetch(baseUrl + `/memo/edit`, {
        method: "POST",
        credentials: 'include',
        body: JSON.stringify(memo),
        headers: {
            "Content-Type": "application/json",
        },
    })
}

export const FindMemoByIDApi = (id: Partial<MemoType>) => {
    return myFetch(baseUrl + `/memo`, {
        method: "POST",
        credentials: 'include',
        body: JSON.stringify(id),
        headers: {
            "Content-Type": "application/json",
        },
    })
}