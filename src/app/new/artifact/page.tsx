"use client";

import React, { useState } from "react";
import DataService from "../../services/dataService";

// https://www.formbackend.com/nextjs-form
export default function NewArtifactForm() {
    const handleInput = (e: React.FormEvent<HTMLInputElement> | React.FormEvent<HTMLTextAreaElement>) => {
        const fieldName = e.currentTarget.name;
        const fieldValue = e.currentTarget.value;

        setFormData((prevState) => ({
            ...prevState,
            [fieldName]: fieldValue
        }));
    }

    const blankFormData = {
        name: "",
        category: "",
        description: "",
    }
    const [formData, setFormData] = useState(blankFormData);

    const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        await DataService.createNew(formData, DataService.DataType.ARTIFACT).then((res) => {
            if (res.success) {
                alert("Review successfully posted!");
            }
            else {
                alert("Sorry, an error occured.");
            }
        });
    }

    return (
        <div>
            <h2>Create New Artifact</h2>
            <form method="POST" action="" onSubmit={submitForm}>
                <div>
                    <label>Name</label>
                    <br />
                    <input type="text" name="name" onChange={handleInput} />
                </div>

                <div>
                    <p>Origin</p>
                    <br />
                    <input type="radio" id="planar" name="category" value="Planar" onChange={handleInput} /> <label htmlFor="planar">Planar</label><br />
                    <input type="radio" id="extraplanar" name="category" value="Extraplanar" onChange={handleInput} /> <label htmlFor="extraplanar">Extraplanar</label><br />
                </div>

                <div>
                    <label>Description</label>
                    <br />
                    <textarea name="description" onChange={handleInput}></textarea>
                </div>

                <button type="submit">Create New Artifact</button>
            </form>
        </div>
    );
}