"use client";

import React, { useState } from "react";
import ResearcherService from "../../services/researcherService";

export default function NewExperienceForm() {
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

        await ResearcherService.createNew(formData).then((res) => {
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
            <h2>Log a New Experience</h2>
            <form method="POST" action="" onSubmit={submitForm}>
                <div>
                    <label>Name</label>
                    <br />
                    <input type="text" name="name" onChange={handleInput} />
                </div>

                <div>
                    <p>Category</p>
                    <br />
                    <input type="radio" id="human" name="category" value="Human" onChange={handleInput} /> <label htmlFor="human">Human</label><br />
                    <input type="radio" id="manufactured" name="category" value="Manufactured" onChange={handleInput} /> <label htmlFor="manufactured">Manufactured</label><br />
                </div>

                <div>
                    <label>Description</label>
                    <br />
                    <textarea name="description" onChange={handleInput}></textarea>
                </div>

                <button type="submit">Create New Researcher</button>
            </form>
        </div>
    );
}