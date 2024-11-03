"use client";

import React, { useState } from "react";
import DataService from "../../services/dataService";
import Category from "@/app/category";

// https://www.formbackend.com/nextjs-form
export default function NewEntityForm() {
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
        origin: "",
        description: "",
    }
    const [formData, setFormData] = useState(blankFormData);

    const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        await DataService.createNew(formData, Category.ENTITY).then((res) => {
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
            <h2>Create New Entity</h2>
            <form method="POST" action="" onSubmit={submitForm}>
                <div>
                    <label>Name</label>
                    <br />
                    <input type="text" name="name" onChange={handleInput} value={formData.name}/>
                </div>

                <div>
                    <p>Origin</p>
                    <br />
                    <input type="radio" id="planar" name="origin" value="Planar" onChange={handleInput} /> <label htmlFor="planar">Planar</label><br />
                    <input type="radio" id="extraplanar" name="origin" value="Extraplanar" onChange={handleInput} /> <label htmlFor="extraplanar">Extraplanar</label><br />
                </div>

                <div>
                    <label>Description</label>
                    <br />
                    <textarea name="description" onChange={handleInput} value={formData.description}></textarea>
                </div>

                <button type="submit">Create New Entity</button>
            </form>
        </div>
    );
}