import React from "react";
import Session from "../components/session";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Profile|Education Assiatant",
    description: "Free Education for All!",
};

export default function ProfileLayout({
    children,
}: {
    children: React.ReactNode
    }) {
    return (
        <>
            <Session />

            {children}
        </>
    )
}