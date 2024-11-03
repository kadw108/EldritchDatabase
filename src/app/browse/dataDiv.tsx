import styles from "./dataDiv.module.css";
import Category from "../category";

export default function DataDiv({data, category}: any) {
    let categoryInfo;
    if (category == Category.RESEARCHER) {
        categoryInfo = <p><small>{data.category}</small></p>;
    }
    else if (category == Category.ENTITY) {
        categoryInfo = <p><small>{data.origin}</small></p>;
    }
    else if (category == Category.ARTIFACT) {
        categoryInfo = <p><small>{data.nature}</small></p>;
    }

    return (
        <div className={styles.dataDiv}>
            <h3>{data.name}</h3>
            {categoryInfo} 
            <p>{data.description}</p>
        </div>
    );
}