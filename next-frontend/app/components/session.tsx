"use client"
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface User{
    name: string;
    age: number;
    department: string;
    email: string;
    address: string;
    profilePicture: string;
}
export default function Session() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                const email = localStorage.getItem('email');
                if (token) {
                    const response = await axios.get('http://localhost:5000/student/user/' + email, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setUser(response.data);
                } else {
                    router.push('/login');
                }
            } catch (error) {
                console.error('Error fetching userdata: ', error);
                router.push('/login');
            }
        };
        fetchUserData();
    },
        [router]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('email');

        router.push('/login');
    };

    const handleProfile = () => {
        router.push('/profile');
    };

    const handleCourse = () => {
        router.push('/courses');
    };

    const handleDownload = () => {
        router.push('/downloads');
    };

    const handleSettings = () => {
        router.push('/settings');
    };

    const handleHome = () => {
        router.push('/dashboard');
    };

    if (!user) {
        return <div></div>;
    } else {
        return (
            <>
            <div className="navbar bg-base-100">
                    <div className="flex-1">
                        <a onClick={handleProfile} className="btn btn-ghost text-xl">Welcome, {user && user.name}</a>
              </div>
              <div className="flex-none gap-2">
                <div className="form-control">
                  <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
                </div>
                <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img alt="Tailwind CSS Navbar component" src={'http://localhost:5000/student/getimage/'+user.profilePicture} />
                  </div>
                </div>
                            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                                <li onClick={handleHome}><a>Home</a></li>
                    <li onClick={handleProfile}>
                      <a className="justify-between">
                        Profile
                        <span className="badge">New</span>
                      </a>
                    </li>
                      <li onClick={handleCourse}><a>Course Registration</a></li>
                      <li onClick={handleDownload}><a>Downloads</a></li>
                      <li onClick={handleSettings}><a>Settings</a></li>
                      <li onClick={handleLogout}><a>Logout</a></li>
                  </ul>
                </div>
              </div>
            </div>
            </>
        )
    }
}