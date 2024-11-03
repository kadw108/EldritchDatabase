import "./dataDiv.css";

export default function DataDiv({data}: any) {
    return (
        <div className="dataDiv">
            <h3>{data.name}</h3>
            <p><small>{data.category}</small></p>
            <p>{data.description}</p>
        </div>
    );
}