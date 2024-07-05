"use client";
import React, { useState } from "react";
import useFetch from "@/utils/useFetch";
import JobList from "../dashboard/_components/JobList";
import Image from "next/image";

interface Job {
    job_id: string;
    employer_name: string;
    job_title: string;
    job_description: string;
    job_apply_link: string;
    job_required_experience: {
        required_experience_in_months: number;
    };
    job_min_salary: number | null;
    job_max_salary: number | null;
    job_salary_currency: string | null;
    job_city: string;
    job_state: string;
}

const JobSearch = () => {
    const [role, setRole] = useState<string>("");
    const [visibleJobs, setVisibleJobs] = useState<number>(10);
    const { data, isLoading, error, refetch } = useFetch("search", role ? { query: role } : null);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setVisibleJobs(10); // Reset the visible jobs count on new search
        refetch();
    };

    const loadMore = () => {
        setVisibleJobs((prev) => prev + 10);
    };

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-center mb-6">Job Search</h1>
            <form onSubmit={handleSubmit} className="flex justify-center mb-6">
                <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="Enter job role (e.g., React)"
                    className="p-2 border border-gray-300 rounded-l-md w-2/3"
                />
                <button type="submit" className="p-2 bg-blue-500 text-white rounded-r-md">Search</button>
            </form>

            {isLoading && <img src="./Fullsnake.gif" className="flex justify-center" /> }
            {error && <p className="text-center text-red-500">Error fetching jobs.</p>}

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {data.slice(0, visibleJobs).map((job: Job) => (
                    <JobList job={job} role={role} key={job.job_id}/>

                ))}
            </ul>

            {visibleJobs < data.length && (
                <button
                    onClick={loadMore}
                    className="block mt-8 mx-auto bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 transition"
                >
                    Read More
                </button>
            )}
        </div>
    );
};

export default JobSearch;
