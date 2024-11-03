import styles from "./dataDiv.module.css";

export default function DataDiv({data}: any) {
    return (
        <div className={styles.dataDiv}>
            <h3>{data.name}</h3>
            <p><small>{data.category}</small></p>
            <p>{data.description}</p>
        </div>
    );
}