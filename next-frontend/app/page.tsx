"use client"
import { useRouter } from "next/navigation";
import { useEffect } from 'react';
import toast from 'react-hot-toast';

export default function Home() {
    const router = useRouter();
    const handleLogin = () => {
        router.push('/login');
    };

    const handleSignup = () => {
        router.push('/signup');
    };

    return (
        <div id="background-root" className="hero max-h-screen" style={{
            backgroundImage: 'url("/backgrounds/eebg.jpg")' }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        <h1 className="mb-4 text-5xl font-bold">Hello there!</h1>
                        <p className="mb-4 font-size">As a non-profitable organization,
                            EA should create the scope for the students
                            and provide free education to the poor to
                            develop better careers. After proper
                            implementations, the researcher can also
                            spend their quality time on this platform
                            to explore and publish their articles easily.
                            These students and research works can be
                            contributed as an asset for development.
                            Hence, the education sector of our country
                            might get strong enough to mitigate any crisis
                            effectively and improvise global contribution.</p>
                        <button className="btn btn-primary" onClick={() => document.getElementById('my_modal_1').showModal()}>Get Started</button>
                        <dialog id="my_modal_1" className="modal">
                            <div className="modal-box">
                                <h3 className="font-bold">Welcome to Education Assistant!</h3>
                                <center>
                                    <p className="py-4">Login or Signup</p>
                                </center>
                                <center>
                                    <button className="btn btn-primary btn-size" onClick={handleLogin}>LogIn</button><br /><br />
                                    <button className="btn btn-secondary btn-size" onClick={handleSignup}>SignUp</button>
                                </center>
                                <div className="modal-action">
                                    <form method="dialog">
                                        <button className="btn">Close</button>
                                    </form>
                                </div>
                            </div>
                        </dialog>
                    </div>
                </div>
            </div>
    );
}

