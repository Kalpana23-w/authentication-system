"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
import LoadingIndicator from './LoadingIndicatior'

const Navbar = () => {
    const [isAuth, setIsAuth] = useState(null)
    return (
        <>
        {/* {isAuth === null && <LoadingIndicator/>} */}
            <nav className="bg-purple-800 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <Link href="/" className="text-white mr-4">Home</Link>
                        {isAuth ? (<> <Link href="/user/Profile" className="text-white mr-4">Profile</Link></>) : (<>
                            <Link href="/account/login" className="text-white mr-4">Login</Link>
                            <Link href="/account/register" className="text-white mr-4">Registration</Link>      </>)}
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar