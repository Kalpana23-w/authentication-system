import Sidebar from "@/components/Sidebar.jsx";
import React from "react";
const UserLayout = ({ children }) => {
    return (
        <>
            <div className="grid grid-cols-12 bg-gray-100">
                <div className="col-span-2">
                    <Sidebar/>
                </div>

                <div className="col-span-10">
                    {children}
                </div>
            </div>


        </>
    )
}

export default UserLayout;