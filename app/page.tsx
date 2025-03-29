import { Metadata } from "next";
import React from "react";
import HomePage from "./components/HomePage";

export const metadata: Metadata = {
    title: "Editor",
    description: "Editor for UiBuild",
};

export default function page() {
    return <HomePage />;
}
