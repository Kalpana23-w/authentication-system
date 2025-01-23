import Navbar from "@/components/Navbar";
import React from "react";
const AccountLayout = ({ children }) => {
    return (
        <>
            <Navbar />
            {children}      

        </>
    )
}

export default AccountLayout;