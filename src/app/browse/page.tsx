"use client";

import React, { useState } from "react";
import styles from "./showAll.module.css";
import ExperienceService from "../services/experienceService";
import AllExperiences from "./allExperiences";
import DataDiv from "./dataDiv";
import Category from "../category";

import SelectItem from "../components/SelectItem";

// TODO: There is a bug where searching with the same filtered researcher/artifact/entity
// twice in a row makes it not work the second time (it becomes undefined). No idea
// why this happens. Fix later.

function displayResultExperiences(allResults: any) {
    let content =
        <div>
            {allResults.map((info: any) => (
                <DataDiv key={info._id} data={info} category={Category.EXPERIENCE} />
            ))}
        </div>;
    if (allResults.length == 0) {
        content =
            <div>
                <p>Nothing yet.</p>
            </div>;
    }

    return (
        <div className={styles.sectionContainer}>
            <h2>Search Results</h2>
            {content}
        </div>
    );
}

export default function BrowsePage() {
    const defaultFilters = {
        researchers: [] as Array<string>,
        artifacts: [] as Array<string>,
        entities: [] as Array<string>,
    }
    const [filters, setFilters] = useState(defaultFilters);
    const [searchResults, setSearchResults] = React.useState(null);
    const [searchString, setSearchString] = React.useState("");
    const searchStringInput = (e: React.FormEvent<HTMLInputElement> | React.FormEvent<HTMLTextAreaElement>) => {
        const fieldName = e.currentTarget.name;
        const fieldValue = e.currentTarget.value;

        setSearchString(fieldValue);
    }

    let results;
    if (searchResults == null) {
        results = <AllExperiences />;
    }
    else {
        results = displayResultExperiences(searchResults);
    }

    const submitSearch = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let performSearch = false;
        if ((searchString != "") ||
            (filters.researchers.length > 0) ||
            (filters.artifacts.length > 0) ||
            (filters.entities.length > 0)
        ) {
            performSearch = true;
        }

        if (performSearch) {
            await ExperienceService.search(searchString, filters).then((res) => {
                if (res.success) {
                    console.log(res.data);
                    setSearchResults(res.data.objects);
                }
                else {
                    alert("Sorry, an error occured.");
                }
            });
        } else {
            setSearchResults(null);
        }
    }

    const getResearcherFilters = (childData: any[]) => {
        setFilters((prevState) => ({
            ...prevState,
            researchers: childData
        }));
    }
    const getArtifactFilters = (childData: any[]) => {
        setFilters((prevState) => ({
            ...prevState,
            artifacts: childData
        }));
    }
    const getEntityFilters = (childData: any[]) => {
        setFilters((prevState) => ({
            ...prevState,
            entities: childData
        }));
    }

    return (
        <div>
            <div className={styles.sectionContainer}>
                <h2>Browse Experiences</h2>

                <form method="POST" action="" onSubmit={submitSearch}>
                    <div>
                        <label>Filter: Associated Researchers</label>
                        <br />
                        <SelectItem category={Category.RESEARCHER} buttonText="Add Researcher" sendData={getResearcherFilters}/>
                    </div>

                    <div>
                        <label>Filter: Associated Artifacts</label>
                        <br />
                        <SelectItem category={Category.ARTIFACT} buttonText="Add Artifact" sendData={getArtifactFilters}/>
                    </div>

                    <div>
                        <label>Filter: Associated Entities</label>
                        <br />
                        <SelectItem category={Category.ENTITY} buttonText="Add Entity" sendData={getEntityFilters}/>
                    </div>

                    <div>
                        <label>Search: Name/Description</label>
                        <br />
                        <input type="text" name="name" onChange={searchStringInput} value={searchString} />
                        <br />
                        Any keyword entered above will be used in the search.
                    </div>

                    <button type="submit">Search Experiences</button>
                </form>

                <br />
                <hr />
                <br />

                {results}
            </div>
        </div>
    );
}