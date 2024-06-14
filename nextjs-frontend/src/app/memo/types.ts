export interface Memo {
    id?: string | number,
    content: string,
    createTime?: string
}

export type VoidFunction = () => void