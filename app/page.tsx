"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
export default function Home() {
  const router = useRouter();


  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  
  const [phoneNumber, setPhoneNumber] = useState("");
  const [location, setLocation] = useState("");
  const [levelOfEducation, setLevelOfEducation] = useState("");
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [currentTime, setCurrentTime] = useState(new Date());

  const [loading, setLoading] = useState(false);

  

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);
  
    // Replace with your actual Google Form URL and entry IDs
    const googleFormURL = "https://docs.google.com/forms/d/e/1FAIpQLSej5zLuE0py92LAQnGEOW6ygd0mRmYwrI7YoNRgK7mU_qNbmg/formResponse";
  
    // Map React form fields to Google Form entry IDs
    const formData = new FormData();
    formData.append("entry.1591408324", fullname); // Replace with your entry ID
    formData.append("entry.1689605740", email); // Replace with your entry ID
    formData.append("entry.1790398587", phoneNumber); // Replace with your entry ID
    formData.append("entry.1609829514", location); // Replace with your entry ID
    formData.append("entry.306990567", levelOfEducation); // Replace with your entry ID
  
    fetch(googleFormURL, {
      method: "POST",
      mode: "no-cors", // Required for Google Forms submission
      body: formData,
    })
      .then(() => {
        setSuccess(true);
        setLoading(false);
        setTimeout(() => {
          router.push("https://portal.jhu.edu.ng/Applicant/ApplicantAccount/SignUp"); // Redirect or show a success message
        }, 3000);
      })
      .catch(error => {
        console.error("Error submitting form:", error);
        setError("Failed to submit. Please try again.");
        setLoading(false);
      });
  };
  

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Update every second

    return () => clearInterval(timerId); // Cleanup on component unmount
  }, []);

  const formatDateToWords = (date: Date): string => {
    const day = date.getDate();
    const dayNames = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dayOfWeek = dayNames[date.getDay()]; // Get day of the week
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    // Convert day to ordinal (1st, 2nd, 3rd, etc.)
    const ordinalSuffix = (day: number): string => {
      if (day > 3 && day < 21) return "th"; // Special case for 11-20
      switch (day % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };

    return `${dayOfWeek} ${day}${ordinalSuffix(day)} of ${month}  ${year}`;
  };
  const formattedTime = currentTime.toLocaleTimeString();
  const formattedDateInWords = formatDateToWords(currentTime);
  return (
    <div
      className="w-full min-h-dvh  py-5 px-6 md:px-0 text-black bg-amber-50"
      
    >
      <h2 className="w-full text-center text-lg md:text-2xl flex flex-col md:flex-row justify-center items-center gap-4">
        <Image
          src="/The-Logo.png"
          alt=""
          className="py-2.5"
          height={40}
          width={40}
        />
        James Hope University 
      </h2>
      <h4 className="w-full text-center text-lg md:text-2xl my-4 font-bold">
        Fill The form
      </h4>
      <div className="max-w-[500px] min-h-[300px] mx-auto flex flex-col justify-start items-start gap-6">
        <h6>
          {formattedDateInWords} {formattedTime}
        </h6>
        {success? ( <div className="w-full">
              <img
                src="/successful.gif"
                alt="Success"
                className="mx-auto"
              />
              <h1 className="text-center text-custom-blue text-heading-s mt-5">
                Registration Successful!
              </h1>
            </div>):(
              <form onSubmit={handleSubmit} className="grid gap-4 py-4 w-full">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium leading-none">
                  Full Name
                </label>
                <input
                  type="text"
                  className="flex h-10 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-black focus:outline-none focus:ring-0"
                  placeholder="Enter Full Name"
                  onChange={(e) => setFullname(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="Email" className="text-sm font-medium leading-none">
                  Email
                </label>
                <input
                  type="email"
                  className="flex h-10 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-black focus:outline-none focus:ring-0"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="phone number"
                  className="text-sm font-medium leading-none"
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  className="flex h-10 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-black focus:outline-none focus:ring-0"
                  placeholder="Phone Number"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium leading-none"
                >
                  Location
                </label>
                <input
                  type="text"
                  className="flex h-10 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-black focus:outline-none focus:ring-0"
                  placeholder="Enter Your Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="country"
                  className="text-sm font-medium leading-none"
                >
                  Level of Education
                </label>
                <input
                  type="text"
                  className="flex h-10 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-black focus:outline-none focus:ring-0"
                  placeholder="Level of Education"
                  onChange={(e) => setLevelOfEducation(e.target.value)}
                />
              </div>
              {error && <p className="text-red-500 items-center mt-5 text-body-s">{error}</p>}
              <button className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-[#66001a] h-10 px-4 py-2 text-white hover:bg-slate-700">
              {loading ? "Creating..." : "Submit"}
              </button>
            </form>
            )}

        <p className="text-xs text-black w-full text-center">
          © Copyright 2025 New Horizons Nigeria, All Rights Reserved.
        </p>
      </div>
    </div>
  )
}
