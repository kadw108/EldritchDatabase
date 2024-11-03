"use client";

import React, { useState } from "react";
import DataService from "../services/dataService";

import DataDiv from "./dataDiv";
import Loading from "./loading";

import styles from "./showAll.module.css";

export default function AllResearchers() {
    const [allResults, setAllResults] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        async function getData() {
            // load items from database
            const serviceInfo = await DataService.getAll(DataService.DataType.ARTIFACT);
            setAllResults(serviceInfo.data);
            setIsLoading(false);
        }
        getData();
    }, []);

    let content = 
        <div>
            {allResults.map((info: any) => (
                <DataDiv key={info._id} data={info} />
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
            <h2>Artifacts</h2>
            {content}
        </div>
    );
}