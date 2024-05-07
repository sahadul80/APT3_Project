"use client";
import { FiUpload, FiCheck } from 'react-icons/fi';
import axios from "axios";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Toaster, toast } from 'react-hot-toast';

export default function Profile() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        age: 0,
        gender: '',
        department: '',
        address: '',
        email: '',
        studentId: '',
        cgpa: 0,
        profilePicture: '',
        profilePictureUrl: '' // New state to store the URL of the selected image for preview
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                const email = localStorage.getItem('email');
                if (token) {
                    const response = await axios.get(`http://localhost:5000/student/user/${email}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setFormData(response.data);
                } else {
                    router.push('/login');
                }
            } catch (error) {
                console.error('Error fetching userdata: ', error);
                router.push('/login');
            }
        };
        fetchUserData();
    }, [router]);

    const handleUpdate = () => {
        router.push('/update');
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target) {
                    setFormData(prevState => ({
                        ...prevState,
                        profilePicture: file,
                        profilePictureUrl: event.target.result as string // Set the URL of the selected image for preview
                    }));
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const formDataToSend = new FormData();
            formDataToSend.append('profilePicture', formData.profilePicture);
            const response = await axios.post(`http://localhost:5000/student/profile-picture/${formData.studentId}`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                },
            });
            console.log('Profile picture uploaded:', response.data);
            toast.success('Profile picture uploaded successfully!');
        } catch (error) {
            console.error('Error uploading profile picture:', error);
        }
    };

    return (
        <>
            <Toaster />
            <div className="card w-96 bg-base-100 shadow-xl">
                <center>
                    <figure style={{
                        backgroundImage: formData.profilePictureUrl ? `url(${formData.profilePictureUrl})` : `url('http://localhost:5000/student/getimage/${formData.profilePicture}')`,
                        backgroundSize: 'cover', // Ensures the image covers the entire background area
                        width: '300px', // Set the width of the figure
                        height: '300px', // Set the height of the figure
                    }} />
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="file-upload" className="cursor-pointer">
                            <FiUpload className="inline-block mr-2" />Upload
                        </label>
                        <input type="file" id="file-upload" accept="image/*" className="hidden" onChange={handleImageChange} />
                        <button type="submit">
                            <FiCheck className="inline-block mr-2" />Done
                        </button>
                    </form>
                </center>
                <div className="card-body">
                    <h2 className="card-title">Student ID: {formData.studentId}</h2>
                    <p>Email: {formData.email}</p>
                    <p>Age: {formData.age}</p>
                    <p>Department: {formData.department}</p>
                    <p>Address: {formData.address}</p>
                    <p>CGPA: {formData.cgpa}</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary" onClick={handleUpdate}>Update</button>
                    </div>
                </div>
            </div>
        </>
    );
}

