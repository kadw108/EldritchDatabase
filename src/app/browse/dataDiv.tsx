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

    let title;
    if (category != Category.EXPERIENCE) {
        title = <h3>{data.name}</h3>;
    }
    else {
        title = <h3><a href={"/experience/" + data._id}>{data.name}</a></h3>;
    }

    return (
        <div className={styles.dataDiv}>
            {title}
            {categoryInfo} 
            <p>{data.description}</p>
        </div>
    );
}