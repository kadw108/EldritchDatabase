"use client";

import React, { useState } from "react";
import ResearcherService from "../services/researcherService";

import DataDiv from "./dataDiv";
import Loading from "./loading";

export default function AllResearchers() {
    const [allResults, setAllResults] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        async function getData() {
            // load items from database
            const serviceInfo = await ResearcherService.getAll();
            setAllResults(serviceInfo.data);
            setIsLoading(false);
        }
        getData();
    }, []);

    let content = 
        <div className='cardcontainer'>
            {allResults.map((info: any) => (
                <DataDiv key={info._id} data={info} />
            ))}
        </div>;
    if (isLoading) {
        content = <Loading/>;
    }

    return (
        <div>
            <h2>Researchers</h2>
            {content}
        </div>
    );
}