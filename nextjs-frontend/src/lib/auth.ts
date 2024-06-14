'use client';
import {
    storage
} from './storage';

const KEY = 'token';
const webStorage = storage.local;
let currentToken = webStorage.get && webStorage.get<string>(KEY) || '';

export function setToken(token = ''): void {
    currentToken = token;
    webStorage.set && webStorage.set(KEY, currentToken);
}

export function getToken(): string {
    return currentToken;
}

export function clearToken(): void {
    currentToken = '';
    webStorage.remove && webStorage.remove(KEY);
}
