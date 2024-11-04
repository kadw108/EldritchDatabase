"use client";

import React, { useState } from "react";
import DataService from "../services/dataService";
import Category from "../category";

import DataDiv from "./dataDiv";
import Loading from "./loading";

import styles from "./showAll.module.css";

export default function AllExperiences() {
    const [allResults, setAllResults] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        async function getData() {
            // load items from database
            const serviceInfo = await DataService.getAll(Category.EXPERIENCE);
            setAllResults(serviceInfo.data);
            setIsLoading(false);
        }
        getData();
    }, []);

    let content = 
        <div>
            {allResults.map((info: any) => (
                <DataDiv key={info._id} data={info} category={Category.EXPERIENCE}/>
            ))}
        </div>;
    if (allResults.length == 0) {
        content = 
            <div>
                <p>Nothing yet.</p>
            </div>;
    }
    if (isLoading) {
        content = <Loading/>;
    }

    return (
        <div className={styles.sectionContainer}>
            <h2>Experiences</h2>
            {content}
        </div>
    );
}