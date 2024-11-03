"use client";

import React, { useState } from "react";
import DataService from "../../services/dataService";
import Category from "@/app/category";

// https://www.formbackend.com/nextjs-form
export default function NewResearcherForm() {
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

    return (
        <div>
            <h2>Create New Researcher</h2>
            <form method="POST" action="" onSubmit={submitForm}>
                <div>
                    <label>Name</label>
                    <br />
                    <input type="text" name="name" onChange={handleInput} value={formData.name}/>
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
                    <textarea name="description" onChange={handleInput} value={formData.description}></textarea>
                </div>

                <button type="submit">Create New Researcher</button>
            </form>
        </div>
    );
}