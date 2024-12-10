import React, { FormEvent, useState } from "react";
import popstyles from "./selectitem.module.css";
import DataService from "../services/dataService";
import Loading from "./loading";

// Lets you select any combination of existing researchers, artifacts, or entities. Pick one category.
// Creates a pop-up menu to select from. Selected items appear in the sourceList/GenerateList and can be removed.

export default function SelectItem({ category, buttonText, sendData }: any) {
    const [sourceList, setSourceList] = useState<any[]>([]);
    const [popups, setPopups] = useState(<span></span>);

    const addObject = (e: FormEvent<HTMLButtonElement>) => {
            const newData = JSON.parse(e.currentTarget.value);
            const newList = [...sourceList, newData];
            setSourceList(newList);
            sendData(newList);
            hidePopup();
        }
    const removeObject = (e: FormEvent<HTMLButtonElement>) => {
        const id = e.currentTarget.value;
        const newList = sourceList.filter((i: any) => i._id != id);
        setSourceList(newList);
        sendData(newList);
    }

    function SelectedEntry({data}: any) {
        return <li>
            <button type="button" value={data._id} onClick={removeObject}>Remove</button>
            <label> {data.name}</label>
        </li>;
    }
    function PopupResult({data}: any) {
        return <div className={popstyles.result}>
            <button type="button" value={JSON.stringify(data)} onClick={addObject}>Select</button>
            <label> {data.name}</label>
        </div>
    }

    function Popup() {
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
                    <PopupResult key={info._id} data={info} category={category} />
                ))}
            </div>;
        if (allResults.length == 0) {
            content =
                <div>
                    <p>There are none available.</p>
                </div>;
        }
        if (isLoading) {
            content = <Loading />;
        }

        return (
            <div className={popstyles.popup + " " + popstyles.absoluteAlign}>
                <button type="button" className={popstyles.closeButton} onClick={hidePopup}>X</button>
                <h3>{(category.string)}</h3>
                {content}
            </div>
        );
    }

    const showPopup = () => {
        setPopups(<Popup/>);
        document.getElementById(popstyles.screenCover)?.classList.remove("hidden");
    };
    const hidePopup = () => {
        setPopups(<span></span>);
        document.getElementById(popstyles.screenCover)?.classList.add("hidden");
    }

    const GenerateList = () => {
        let resultsList =
            <div>
                <ul>
                    {sourceList.map((info: any) => (
                        <SelectedEntry key={info._id} data={info} category={category} />
                    ))}
                </ul>
            </div>;
        if (sourceList.length == 0) {
            resultsList = <p><em>None yet.</em></p>;
        }
        return resultsList;
    }

    return <div className={popstyles.noMargin}>
        {popups}
        <GenerateList/>
        <button type="button" onClick={showPopup}>{buttonText}</button>
    </div>
}