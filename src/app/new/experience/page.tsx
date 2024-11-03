"use client";

import React, { FormEvent, useState } from "react";
import DataService from "../../services/dataService";
import Category from "@/app/category";

import Loading from "../../browse/loading";

import styles from "./popup.module.css";

// https://www.formbackend.com/nextjs-form
export default function NewExperienceForm() {
    const blankFormData = {
        name: "",
        researchers: [] as Array<string>,
        description: "",
    }
    const [formData, setFormData] = useState(blankFormData);
    const [popups, setPopups] = useState(<span></span>);

    const handleInput = (e: React.FormEvent<HTMLInputElement> | React.FormEvent<HTMLTextAreaElement>) => {
        const fieldName = e.currentTarget.name;
        const fieldValue = e.currentTarget.value;

        setFormData((prevState) => ({
            ...prevState,
            [fieldName]: fieldValue
        }));
    }

    function ResearcherEntry({data}: any) {
        return <li>
            {data.name}
        </li>;
    }

    function PopupResult({data}: any) {
        return <div className={styles.result}>
            <button type="button" value={data._id} onClick={addResearcher}>Select</button>
            <label> {data.name}</label>
        </div>
    }

    function ResearcherPopup() {
        const [allResults, setAllResults] = React.useState([]);
        const [isLoading, setIsLoading] = React.useState(true);

        React.useEffect(() => {
            async function getData() {
                // load items from database
                const serviceInfo = await DataService.getAll(Category.RESEARCHER);
                setAllResults(serviceInfo.data);
                setIsLoading(false);
            }
            getData();
        }, []);

        let content = 
            <div>
                {allResults.map((info: any) => (
                    <PopupResult key={info._id} data={info}/>
                ))}
            </div>;
        if (allResults.length == 0) {
            content = 
                <div>
                    <p>There are no researchers.</p>
                </div>;
        }
        if (isLoading) {
            content = <Loading/>;
        }

        return (
            <div className={styles.popup + " " + styles.absoluteAlign}>
                <button type="button" className={styles.closeButton} onClick={hidePopups}>X</button>
                <h3>Researchers</h3>
                {content}
            </div>
        );
    }
    const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        await DataService.createNew(formData, Category.RESEARCHER).then((res) => {
            if (res.success) {
                alert("Successfully posted!");
                setFormData(blankFormData);
                document.querySelectorAll('input[type="radio"]').forEach((i) => (i as HTMLInputElement).checked = false);
            }
            else {
                alert("Sorry, an error occured.");
            }
        });
    }

    const showResearchers = () => {
        setPopups(<ResearcherPopup/>);
        document.getElementById(styles.screenCover)?.classList.remove("hidden");
    };
    const hidePopups = () => {
        setPopups(<span></span>);
        document.getElementById(styles.screenCover)?.classList.add("hidden");
    }

    const addResearcher = (e: FormEvent<HTMLButtonElement>) => {
        const new_id = e.currentTarget.value;
        setFormData((prevState) => ({
            ...prevState,
            researchers: [...formData.researchers, new_id]
        }));
        hidePopups();
    }

    let researcherInput = 
        <div>
            <ul>
            {formData.researchers.map((info: any) => (
                <ResearcherEntry key={info._id} data={info}/>
            ))}
            </ul>
        </div>;
    if (formData.researchers.length == 0) {
        researcherInput = <p>None yet.</p>;
    }

    return (
        <div>
            {popups}
            <div id={styles.screenCover} className={styles.absoluteAlign + " hidden"}></div>
            <h2>File a New Experience</h2>
            <form method="POST" action="" onSubmit={submitForm}>
                <div>
                    <label>Name</label>
                    <br />
                    <input type="text" name="name" onChange={handleInput} value={formData.name}/>
                </div>

                <div>
                    <label>Researchers Associated</label>
                    <br/>
                    {researcherInput}
                    <button type="button" onClick={showResearchers}>Add Researcher</button>
                </div>

                <div>
                    <label>Description</label>
                    <br />
                    <textarea name="description" onChange={handleInput} value={formData.description}></textarea>
                </div>

                <button type="submit">File a New Experience</button>
            </form>
        </div>
    );
}