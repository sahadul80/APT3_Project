import React from "react";
import Session from "../components/session";
import { Metadata } from "next";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
    title: "Index|Education Assiatant",
    description: "Free Education for All!",
};

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
    }) {
    return (
        <>
            <Session />
            <Toaster/>

            {children}
        </>
    )
}