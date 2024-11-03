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
        nature: "",
        description: "",
    }
    const [formData, setFormData] = useState(blankFormData);

    const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        await DataService.createNew(formData, DataService.DataType.ARTIFACT).then((res) => {
            if (res.success) {
                alert("Successfully posted!");
                setFormData(blankFormData);
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
                    <p>Nature</p>
                    <br />
                    <input type="radio" id="physical" name="nature" value="Physical" onChange={handleInput} /> <label htmlFor="physical">Physical</label><br />
                    <input type="radio" id="digital" name="nature" value="Digital" onChange={handleInput} /> <label htmlFor="digital">Digital</label><br />
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