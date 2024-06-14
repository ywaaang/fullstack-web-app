import http from '@/common/http';
import {
  GET_MEMO_LIST_API
} from '@/common/api';

export interface MemoData {
  id: string;
  content: string;
  datetime: string;
}

/**
 * get user profile data
 * @param params
 */
const getMemoList = (): Promise<Array<MemoData>> => {
  return new Promise<UserProfile>((resolve, reject): void => {
    http.get<Array<MemoData>>(GET_MEMO_LIST_API)
      .then((response): void => {
        resolve(response.data);
      })
      .catch((response): void => {
        reject(response);
      });
  });
};

export {
  getMemoList
};