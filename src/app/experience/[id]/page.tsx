"use client";

import React, { useState } from "react";
import DataService from "../../services/dataService";
import Category from "../../category";

import Loading from "../../components/loading";
import DataDiv from "@/app/browse/dataDiv";

import { useRouter } from "next/navigation";

export default function AllResearchers(
    { params }: { params: Promise<{ id: string }> }
) {
    const router = useRouter();

    const blankExperience = {
        _id: "",
        name: "",
        researchers: [] as Array<string>,
        artifacts: [] as Array<string>,
        entities: [] as Array<string>,
        description: "",
    }
    const [data, setData] = React.useState(blankExperience);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        async function getData() {
            const id = (await params).id;
            // load items from database
            const serviceInfo = await DataService.getOne(Category.EXPERIENCE, id);
            setData(serviceInfo.data);
            setIsLoading(false);
        }
        getData();
    }, []);

    const GenerateList = ({ category }: any) => {
        const [allResults, setAllResults] = React.useState([]);
        const [isLoading, setIsLoading] = React.useState(true);

        let sourceList: Array<string>;
        if (category == Category.RESEARCHER) {
            sourceList = data.researchers;
        }
        else if (category == Category.ARTIFACT) {
            sourceList = data.artifacts;
        }
        else {
            sourceList = data.entities;
        }

        React.useEffect(() => {
            async function getData() {
                const results = [];
                for (const id of sourceList) {
                    const fetchedData = await DataService.getOne(category, id);
                    results.push(fetchedData.data);
                }
                setAllResults(results);
                setIsLoading(false);
            }
            getData();
        }, []);

        let resultsList =
            <div>
                <div>
                    {allResults.map((info: any) => (
                        <DataDiv key={info._id} data={info} category={category} />
                    ))}
                </div>
            </div>;
        if (allResults.length == 0) {
            resultsList = <p><em>None yet.</em></p>;
        }
        return resultsList;
    }

    const deleteObject = () => {
        async function deleteRequest() {
            const deleteResult = await DataService.deleteOne(Category.EXPERIENCE, data._id);
            if (deleteResult.success) {
                alert("Deletion successful.");
                router.push("/");
            }
            else {
                alert("Deletion failed. Sorry.");
            }
        }
        deleteRequest();
    }

    let content;
    if (isLoading) {
        content = <Loading />;
    }
    else {
        content =
            <div>
                <h3>Title: {data.name}</h3>

                <a href={"/experience/" + data._id + "/edit"}><button type="button">Edit</button></a>
                <br/>
                <button type="button" onClick={deleteObject}>Delete</button>
                <hr />

                <h3>Filed by Researcher:</h3>
                <GenerateList category={Category.RESEARCHER} />

                <hr />

                <h3>Associated Artifacts</h3>
                <GenerateList category={Category.ARTIFACT} />

                <h3>Associated Entities</h3>
                <GenerateList category={Category.ENTITY} />

                <hr />

                <h3>Description</h3>
                <p>{data.description}</p>
            </div>
    }

    return (
        <div>
            <h2>Experience</h2>
            {content}
        </div>
    );
}