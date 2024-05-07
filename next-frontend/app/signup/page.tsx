"use client"
import React, { ChangeEvent, FormEvent, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function SignUpForm() {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        gender: '',
        department: '',
        address: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const router = useRouter();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (parseInt(formData.age) <= 0) {
            toast.error("Age can not be a negitave value!");
            return;
        } else if (formData.password !== formData.confirmPassword) {
            toast.error('Passwords did NOT match. Try again!');
            return;
        } else {
            try {
                const response = await axios.post('http://localhost:5000/student/register', formData);
                console.log(response.data);
                toast.success('SignUp successful...');
                router.push('/login');
            } catch (error) {
                toast.error('An unexpected error occurred. Please try again later.');
            }
        }
    };

    return (
        <>
        <Toaster/>
            <div className="hero max-h-screen bg-base-400">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-right">
                        <h1 className="text-4xl font-bold">SignUp now!</h1>
                        <p className="py-4">Already Registered?</p>
                        <p className="py-2">SignIn <Link href="/login/" className="text-red-800">HERE</Link>!</p>
                    </div>
                    <div className="card shrink-2 w-full min-w-sm shadow-2xl bg-base-200">
                        <form className="card-body" onSubmit={handleSubmit}>
                            <div className="form-control">
                                <label className="input input-bordered flex items-center gap-2">
                                    Name
                                    <input type="text" name="name" placeholder="Firstname Lastname" className="grow smaller-placeholder" value={formData.name} onChange={handleChange} required />
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="input input-bordered flex items-center gap-2">
                                    Age
                                    <input type="number" name="age" placeholder="25" className="grow smaller-placeholder" value={formData.age} onChange={handleChange} required />
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="input input-bordered flex items-center gap-2">
                                    Gender
                                    <select name="gender" className="grow" value={formData.gender} onChange={handleSelect} required>
                                        <option>Select gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="input input-bordered flex items-center gap-2">
                                    Department
                                    <select name="department" className="grow" value={formData.department} onChange={handleSelect} required>
                                        <option>Select department</option>
                                        <option value="CSE">CSE</option>
                                        <option value="EEE">EEE</option>
                                        <option value="BBA">BBA</option>
                                        <option value="LLB">LLB</option>
                                        <option value="ENG">ENG</option>
                                        <option value="Arch">ARCH</option>
                                    </select>
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="input input-bordered flex items-center gap-2">
                                    Address
                                    <input type="text" name="address" placeholder="your current address" className="grow smaller-placeholder" value={formData.address} onChange={handleChange} required />
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="input input-bordered flex items-center gap-2">
                                    Email
                                    <input type="email" name="email" placeholder="example@domain.com" className="grow smaller-placeholder" value={formData.email} onChange={handleChange} required />
                            </label>
                            </div>
                            <div className="form-control">
                                <label className="input input-bordered flex items-center gap-2">
                                    Password
                                    <input type="password" name="password" placeholder="1-uppercase, 1-number, 8-char long" className="grow smaller-placeholder" value={formData.password} onChange={handleChange} required />
                            </label>
                            </div>
                            <div className="form-control">
                                <label className="input input-bordered flex items-center gap-2">
                                    Password
                                    <input type="password" name="confirmPassword" placeholder="confirmPassword" className="grow smaller-placeholder" value={formData.confirmPassword} onChange={handleChange} required />
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-secondary">SignUP</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
