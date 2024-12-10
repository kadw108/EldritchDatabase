"use client";

import React, { useState } from "react";
import ExperienceService from "../../services/experienceService";
import Category from "@/app/category";
import styles from "./popup.module.css";
import SelectItem from "@/app/components/SelectItem";

// https://www.formbackend.com/nextjs-form
export default function NewExperienceForm() {
    const blankFormData = {
        name: "",
        researchers: [] as Array<string>,
        artifacts: [] as Array<string>,
        entities: [] as Array<string>,
        description: "",
    }
    const [formData, setFormData] = useState(blankFormData);
    const handleInput = (e: React.FormEvent<HTMLInputElement> | React.FormEvent<HTMLTextAreaElement>) => {
        const fieldName = e.currentTarget.name;
        const fieldValue = e.currentTarget.value;

        setFormData((prevState) => ({
            ...prevState,
            [fieldName]: fieldValue
        }));
    }

    const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        await ExperienceService.createNew(formData).then((res) => {
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

    const getResearchers = (newData: any[]) => {
        setFormData((prevState) => ({
            ...prevState,
            researchers: newData
        }));
    }
    const getArtifacts = (newData: any[]) => {
        setFormData((prevState) => ({
            ...prevState,
            artifacts: newData
        }));
    }
    const getEntities = (newData: any[]) => {
        setFormData((prevState) => ({
            ...prevState,
            entities: newData
        }));
    }

    return (
        <div>
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
                    <SelectItem category={Category.RESEARCHER} buttonText="Add Researcher" sendData={getResearchers}/>
                </div>

                <div>
                    <label>Artifacts Associated</label>
                    <br/>
                    <SelectItem category={Category.ARTIFACT} buttonText="Add Artifact" sendData={getArtifacts}/>
                </div>

                <div>
                    <label>Entities Associated</label>
                    <br/>
                    <SelectItem category={Category.ENTITY} buttonText="Add Entity" sendData={getEntities}/>
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