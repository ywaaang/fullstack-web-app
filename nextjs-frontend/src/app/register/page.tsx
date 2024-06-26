'use client';
import Image from "next/image";
import { FormEventHandler, useState } from "react";
import { postRegisterData } from "../services/login";
import { useRouter } from 'next/navigation';

export default function Register() {
    const [username, setUsername] = useState("test12@test.com");
    const [password, setPassword] = useState("Aa123456!");
    const [confirmpassword, setConfirmpassword] = useState("Aa123456!");
    const router = useRouter();
    const handleSubmit = (event: any) => {
        event.preventDefault();
        if (confirmpassword !== password) {
            alert('Mismatch password')
            return;
        }
        postRegisterData({
            username: username,
            password: password
        }).then((): void => {
            router.push('/login')
        });
    };
    return (
        <div className="w-full flex flex-wrap">
            <div className="w-full md:w-1/2 flex flex-col">
                <div className="flex justify-center md:justify-start pt-12 md:pl-12 md:-mb-12">
                    <a
                        href="#"
                        className="bg-black text-white font-bold text-xl p-4"
                    >
                        Logo
                    </a>
                </div>

                <div className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
                    <p className="text-center text-3xl">Join Us.</p>
                    <form
                        className="flex flex-col pt-3 md:pt-8"
                        onSubmit={handleSubmit}
                    >

                        <div className="flex flex-col pt-4">
                            <label htmlFor="email" className="text-lg">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                placeholder="your@email.com"
                                onChange={(event) =>
                                    setUsername(event.target.value)
                                }
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>

                        <div className="flex flex-col pt-4">
                            <label htmlFor="password" className="text-lg">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Password"
                                onChange={(event) =>
                                    setPassword(event.target.value)
                                }
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>

                        <div className="flex flex-col pt-4">
                            <label
                                htmlFor="confirm-password"
                                className="text-lg"
                            >
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                id="confirm-password"
                                placeholder="Password"
                                onChange={(event) =>
                                    setConfirmpassword(event.target.value)
                                }
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>

                        <input
                            type="submit"
                            value="Register"
                            className="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8"
                        />
                    </form>
                    <div className="text-center pt-12 pb-12">
                        <p>
                            Already have an account?{" "}
                            <a
                                href="/login"
                                className="underline font-semibold"
                            >
                                Log in here.
                            </a>
                        </p>
                    </div>
                </div>
            </div>

            <div className="w-1/2 shadow-2xl">
                <img
                    className="object-cover w-full h-screen hidden md:block"
                    src="https://source.unsplash.com/IXUM4cJynP0"
                    alt="Background"
                />
            </div>
        </div>
    );
}
