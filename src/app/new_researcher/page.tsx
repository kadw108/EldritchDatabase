"use client";
import React, { useState } from "react";

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

    const [formData, setFormData] = useState({
        name: "",
        category: "",
        description: "",
        datetime: null,
    });

    const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
        // We don't want the page to refresh
        e.preventDefault()

        const formURL = e.currentTarget.action;
        const data = new FormData();

        // Turn our formData state into data we can use with a form submission
        Object.entries(formData).forEach(([key, value]) => {
            data.append(key, value);
        })

        // POST the data to the URL of the form
        fetch(formURL, {
            method: "POST",
            body: data,
            headers: {
                'accept': 'application/json',
            },
        }).then(() => {
            setFormData({
                name: "",
                category: "",
                description: ""
            })
        })

        console.log("creation of researcher");
        review.reviewerId = authUser.user.user._id;
        review.itemId = dataObject.item._id;
        review.rating = Number(review.rating);

        await ReviewService.postReview(review, reservationId).then((res) => {
            if (res.success) {
                alert("Review successfully posted!");
                setReview(blankReview);
            }
            else {
                alert("Sorry, an error occured.");
            }
        });
    }
    }

    return (
        <div>
            <h2>Create New Researcher</h2>
            <form method="POST" action="" onSubmit={submitForm}>
                <div>
                    <label>Name</label>
                    <br />
                    <input type="text" name="name" onChange={handleInput} />
                </div>

                <div>
                    <p>Category</p>
                    <br />
                    <input type="radio" id="html" name="category" value="HTML" /> <label htmlFor="html">Human</label><br />
                    <input type="radio" id="css" name="category" value="CSS" /> <label htmlFor="css">Manufactured</label><br />
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