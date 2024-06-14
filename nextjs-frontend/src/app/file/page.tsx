"use client";
import Image from "next/image";
import { FormEventHandler, useEffect, useState } from "react";
import { Input } from "@/components/ui/input"
import {
    upload,
    getUserFiles,
    deleteFile,
    downloadFile
} from '../services/file';
import * as dayjs from "dayjs";

export default function File() {
    const [files, setFiles] = useState([]);
    useEffect(() => {
        loadUserFiles();
    }, [])
    const handleFile = async (event: any) => {
        event.preventDefault();
        const target = event.target;
        if (target && target.files && target.files.length) {
            await upload(target.files, {
                onInit: (progress): void => {
                    //   toastLoading.message = `初始化${progress}%`;
                },
                onProgress: (loaded, total): void => {
                    //   toastLoading.message = `上传中${parseInt((loaded / total * 100).toFixed(2))}%`;
                }
            });
        }
        alert('Success');
        await loadUserFiles();

    }
    const loadUserFiles = async (): Promise<void> => {
        const data = await getUserFiles();
        setFiles(data.files);
    }
    const fileSizeFormat = (size: number): string => {
        const kilobyte = 1024;
        const megabyte = kilobyte * 1024;
        const gigabyte = megabyte * 1024;
        let num = 0;
        let unit = '';
        if (size < kilobyte) {
            num = size;
            unit = 'B';
        } else if (size < megabyte) {
            num = parseFloat((size / kilobyte).toFixed(2));
            unit = 'KB';
        } else if (size < gigabyte) {
            num = parseFloat((size / megabyte).toFixed(2));
            unit = 'MB';
        } else {
            num = parseFloat((size / gigabyte).toFixed(2));
            unit = 'G';
        }
        return `${num}${unit}`;
    }

    const del = async (id: string): Promise<void> => {
        await deleteFile({ id });
        await loadUserFiles();
    }

    const download = (id: string): void => {
        downloadFile({ id });
    }
    return (
        <div className="w-full flex flex-wrap">
            <div className="w-full md:w-1/2 mx-auto flex flex-col justify-start">
                <div className="flex md:justify-start my-20 pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
                    <Input id="picture" type="file" onChange={handleFile} />
                </div>
            </div>


            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                File name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Create Time
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Size
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Download
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Delete
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            files.map((item: any) => (
                                <tr key={item.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {item.filename}
                                    </th>
                                    <td className="px-6 py-4">
                                        {dayjs(item.createTime).format('YYYY-MM-DD HH:mm') }
                                    </td>
                                    <td className="px-6 py-4">
                                        {fileSizeFormat(item.size)}
                                    </td>
                                    <td className="px-6 py-4">
                                        <button onClick={() => download(item.id)}>Download</button>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button onClick={() => del(item.id)}>Delete</button>
                                    </td>
                                </tr>)
                            )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
