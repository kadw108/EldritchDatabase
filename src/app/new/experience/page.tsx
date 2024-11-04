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
        artifacts: [] as Array<string>,
        entities: [] as Array<string>,
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

    function SelectedEntry({data, category}: any) {
        return <li>
            <button type="button" value={data._id} onClick={removeObject(category)}>Remove</button>
            <label> {data.name}</label>
        </li>;
    }
    function PopupResult({data, category}: any) {
        return <div className={styles.result}>
            <button type="button" value={JSON.stringify(data)} onClick={addObject(category)}>Select</button>
            <label> {data.name}</label>
        </div>
    }

    function Popup({category}: any) {
        const [allResults, setAllResults] = React.useState([]);
        const [isLoading, setIsLoading] = React.useState(true);

        React.useEffect(() => {
            async function getData() {
                // load items from database
                const serviceInfo = await DataService.getAll(category);
                setAllResults(serviceInfo.data);
                setIsLoading(false);
            }
            getData();
        }, []);

        let content = 
            <div>
                {allResults.map((info: any) => (
                    <PopupResult key={info._id} data={info} category={category}/>
                ))}
            </div>;
        if (allResults.length == 0) {
            content = 
                <div>
                    <p>There are none available.</p>
                </div>;
        }
        if (isLoading) {
            content = <Loading/>;
        }

        return (
            <div className={styles.popup + " " + styles.absoluteAlign}>
                <button type="button" className={styles.closeButton} onClick={hidePopups}>X</button>
                <h3>{(category.string + "s")}</h3>
                {content}
            </div>
        );
    }
    const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        await DataService.createNew(formData, Category.EXPERIENCE).then((res) => {
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
        setPopups(<Popup category={Category.RESEARCHER}/>);
        document.getElementById(styles.screenCover)?.classList.remove("hidden");
    };
    const showArtifacts = () => {
        setPopups(<Popup category={Category.ARTIFACT}/>);
        document.getElementById(styles.screenCover)?.classList.remove("hidden");
    };
    const showEntities = () => {
        setPopups(<Popup category={Category.ENTITY}/>);
        document.getElementById(styles.screenCover)?.classList.remove("hidden");
    };
    const hidePopups = () => {
        setPopups(<span></span>);
        document.getElementById(styles.screenCover)?.classList.add("hidden");
    }

    const addObject = function(category: any) {
        if (category == Category.RESEARCHER) {
            return (e: FormEvent<HTMLButtonElement>) => {
                const newData = JSON.parse(e.currentTarget.value);
                setFormData((prevState) => ({
                    ...prevState,
                    researchers: [...formData.researchers, newData]
                }));
                hidePopups();
            }
        }
        else if (category == Category.ARTIFACT) {
            return (e: FormEvent<HTMLButtonElement>) => {
                const newData = JSON.parse(e.currentTarget.value);
                setFormData((prevState) => ({
                    ...prevState,
                    artifacts: [...formData.artifacts, newData]
                }));
                hidePopups();
            }
        }
        else if (category == Category.ENTITY) {
            return (e: FormEvent<HTMLButtonElement>) => {
                const newData = JSON.parse(e.currentTarget.value);
                setFormData((prevState) => ({
                    ...prevState,
                    entities: [...formData.entities, newData]
                }));
                hidePopups();
            }
        }
    }
    const removeObject = (category: any) => {
        if (category == Category.RESEARCHER) {
            return (e: FormEvent<HTMLButtonElement>) => {
                const id = e.currentTarget.value;
                setFormData((prevState) => ({
                    ...prevState,
                    researchers: formData.researchers.filter((i: any) => i._id != id)
                }));
            }
        }
        else if (category == Category.ARTIFACT) {
            return (e: FormEvent<HTMLButtonElement>) => {
                const id = e.currentTarget.value;
                setFormData((prevState) => ({
                    ...prevState,
                    artifacts: formData.artifacts.filter((i: any) => i._id != id)
                }));
            }
        }
        else if (category == Category.ENTITY) {
            return (e: FormEvent<HTMLButtonElement>) => {
                const id = e.currentTarget.value;
                setFormData((prevState) => ({
                    ...prevState,
                    entities: formData.entities.filter((i: any) => i._id != id)
                }));
            }
        }
    }

    const GenerateList = ({category}: any) => {
        let sourceList;
        if (category == Category.RESEARCHER) {
            sourceList = formData.researchers;
        }
        else if (category == Category.ARTIFACT) {
            sourceList = formData.artifacts;
        }
        else {
            sourceList = formData.entities;
        }

        let resultsList = 
            <div>
                <ul>
                {sourceList.map((info: any) => (
                    <SelectedEntry key={info._id} data={info} category={category}/>
                ))}
                </ul>
            </div>;
        if (sourceList.length == 0) {
            resultsList = <p><em>None yet.</em></p>;
        }
        return resultsList;
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
                    <GenerateList category={Category.RESEARCHER}/>
                    <button type="button" onClick={showResearchers}>Add Researcher</button>
                </div>

                <div>
                    <label>Artifacts Associated</label>
                    <br/>
                    <GenerateList category={Category.ARTIFACT}/>
                    <button type="button" onClick={showArtifacts}>Add Artifact</button>
                </div>

                <div>
                    <label>Entities Associated</label>
                    <br/>
                    <GenerateList category={Category.ENTITY}/>
                    <button type="button" onClick={showEntities}>Add Entity</button>
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