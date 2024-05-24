'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { config } from 'dotenv';
import { pushDataToDatabase } from '../../backend/index';
import {router} from "next/client";

config({ path: '../../.env' });

export default function useCompleteDetails() {
    const [formData, setFormData] = useState({
        name: '',
        yearOfBirth: '',
        city: '',
        description: '',
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const maxLength = 256;
        // Validate name
        if (name === 'name' && !validateName(value)) {
            // Display error message or handle invalid input
            alert('Name should contain only alphabets and spaces');
            return;
        }
        // Validate description
        if (name === 'description' && !validateDescription(value)) {
            // Display error message or handle invalid input
            alert(`Description should be less than ${maxLength} characters`);
            return;
        }
        setFormData({
            ...formData,
            [name]: value,
        });
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Push data to database
        await pushDataToDatabase(formData);
        // Send user to /personalityTest
        window.location.href = '/testIntro';
        console.log(formData);
    };

    const getLocation = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
            updateCity(latitude, longitude);
        });
    };
    //@ts-ignore
    const updateCity = async (latitude, longitude) => {
        try {
            const API = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
            const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${API}`);
            const data = await response.json();
            // @ts-ignore
            const cityName = data.results[0].address_components.find(component => {
                return component.types.includes('locality');
            }).long_name;
            setFormData({
                ...formData,
                city: cityName,
            });
        } catch (error) {
            console.error('Error fetching city:', error);
        }
    };

    const validateName = (name: string) => {
        // Regex to match only alphabets and spaces
        const regex = /^[A-Za-z\s]+$/;
        return regex.test(name);
    };

    const validateDescription = (description: string) => {
        // Set maximum character limit for description
        const maxLength = 256;
        return description.length <= maxLength;
    };
    const validateAge = ({yearOfBirth}: { yearOfBirth: any }) => {
        const currentYear = new Date().getFullYear();
        const age = currentYear - parseInt(yearOfBirth, 10);
        return age >= 18;
    };
    //@ts-ignore
    const handleYearOfBirthChange = (e) => {
        const { name, value } = e.target;
        if (validateAge({yearOfBirth: value})) {
            setFormData({
                ...formData,
                [name]: value,
            });
        } else {
            // Display an error message or handle invalid input
            alert('You must be 18 or older.');
        }
    };


    return (
        <div className="flex justify-center items-center h-screen pb-10">
            <div className="w-full max-w-xl">
                <h1 className="text-3xl mb-4 font-bold text-center">Tell us about yourself</h1>
                <form onSubmit={handleSubmit} className="space-y-4 border rounded-2xl border-black border-solid p-6 bg-white">
                    <div>
                        <label className="block mb-1">Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1">Year of Birth:</label>
                        <input
                            type="date"
                            name="yearOfBirth"
                            value={formData.yearOfBirth}
                            onChange={handleYearOfBirthChange}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1">City:</label>
                        <div className="flex items-center">
                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                required
                            />
                            <button type="button" onClick={getLocation} className="ml-2 px-4 py-2   rounded-md outline_btn   ">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zM12 12a3 3 0 100-6 3 3 0 000 6z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div>
                        <label className="block mb-1">Write a short description:</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                            rows={4}
                            required
                        ></textarea>
                    </div>
                    <div className="flex justify-center">
                    <button type="submit"  className="w-2/3 px-4 py-2 black_btn"><h1 className='text-xl font-bold'>Done</h1></button>
                    </div>

                </form>
            </div>
        </div>
    );
}
