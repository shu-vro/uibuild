"use client";

import React, { useCallback } from "react";
import { Card, Input, Button, Avatar, CardFooter } from "@heroui/react";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import Image from "next/image";
import signupImage from "@/assets/signup.jpg";
import { Logo } from "@/src/app/editor/components/Header";
import Link from "next/link";
import { useUser } from "@/src/contexts/UserContext";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Page() {
    const router = useRouter();
    const { createUserUsingEmailAndPassword } = useUser();
    const handleSubmit = useCallback(
        async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const name = formData.get("name") as string;
            const email = formData.get("email") as string;
            const password1 = formData.get("password1") as string;
            const password2 = formData.get("password2") as string;
            if (password1 !== password2) {
                toast.error("Passwords do not match");
                return;
            }
            try {
                await createUserUsingEmailAndPassword(email, password1, name);
                toast.success("Account created successfully");
                router.push("/");
            } catch (error: any) {
                toast.error("Error creating account: " + error.message);
                console.log(error);
            }
        },
        [createUserUsingEmailAndPassword, router],
    );
    return (
        <div className="min-h-screen flex">
            <div className="fixed top-4 left-4 z-20">
                <Logo />
            </div>

            {/* left side: Login Form */}
            <div className="w-full md:w-1/2 flex items-center justify-center bg-background p-4 relative">
                <div className="w-[800px] h-[800px] rounded-full bg-primary/25 fixed -top-14 left-10 z-[0] blur-3xl"></div>
                <Card className="p-8 max-w-md w-full shadow-xl">
                    <h2 className="text-3xl font-bold mb-6 text-center">
                        Create an Account
                    </h2>
                    <form
                        className="flex flex-col gap-4"
                        onSubmit={handleSubmit}
                    >
                        <Input
                            label="Name"
                            type="text"
                            className="w-full"
                            name="name"
                        />
                        <Input
                            label="Email"
                            type="email"
                            className="w-full"
                            name="email"
                        />
                        <Input
                            name="password1"
                            label="Password"
                            type="password"
                            className="w-full"
                        />
                        <Input
                            name="password2"
                            label="Confirm Password"
                            type="password"
                            className="w-full"
                        />
                        <Button
                            color="primary"
                            variant="flat"
                            className="mt-2"
                            type="submit"
                        >
                            Signup
                        </Button>
                    </form>

                    <div className="flex items-center my-6">
                        <hr className="flex-grow border-t border-gray-300" />
                        <span className="mx-3 text-sm text-gray-600">
                            Or continue with
                        </span>
                        <hr className="flex-grow border-t border-gray-300" />
                    </div>

                    <div className="flex justify-around gap-2">
                        <Button
                            variant="flat"
                            className="flex items-center gap-2 w-full"
                        >
                            <FaFacebook className="text-2xl" />
                            <span className="hidden sm:inline">Facebook</span>
                        </Button>
                        <Button
                            variant="flat"
                            className="flex items-center gap-2 w-full"
                        >
                            <FaGoogle className="text-2xl" />
                            <span className="hidden sm:inline">Google</span>
                        </Button>
                    </div>

                    <CardFooter>
                        <div className="flex justify-center items-center mt-4">
                            <p className="text-sm text-gray-600">
                                Already have an account?{" "}
                                <Link
                                    href="/auth/login"
                                    className="text-primary font-semibold"
                                >
                                    Login
                                </Link>
                            </p>
                        </div>
                    </CardFooter>
                </Card>
            </div>
            {/* right side: Image */}
            <div className="hidden md:block md:w-1/2 z-10">
                <Image
                    src={signupImage}
                    alt="login"
                    width={600}
                    height={800}
                    className="w-full h-screen object-cover object-bottom"
                />
            </div>
        </div>
    );
}
