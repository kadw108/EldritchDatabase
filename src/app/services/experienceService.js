const SERVER_URL = "http://localhost:8888/api";

class ExperienceService {
    static getIds(data) {
        data.artifacts = data.artifacts.map((data) => data._id);
        data.researchers = data.researchers.map((data) => data._id);
        data.entities = data.entities.map((data) => data._id);
        return data;
    }

    static async createNew(data) {
        console.log("Creation of object.");
        data = this.getIds(data);
        console.log(JSON.stringify(data));

        return new Promise((resolve, reject) => {
            fetch(`${SERVER_URL}/experience/new`, {
                method: "post",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(data),
            })
                .then((res) => res.json())
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    static async editOne(data) {
        console.log("Editing an experience.");
        console.log(JSON.stringify(data));

        const id = data._id;

        return new Promise((resolve, reject) => {
            fetch(`${SERVER_URL}/experience/edit/${id}`, {
                method: "PUT",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(data),
            })
                .then((res) => res.json())
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    /*
     * data: 3 arrays of researchers, artifacts, entities
    */
    static async search(searchString, filters) {
        console.log("SEARCH\n", searchString, filters);
        filters = this.getIds(filters);
        return new Promise((resolve, reject) => {

            // use search query with JS fetch API, see https://stackoverflow.com/a/58437909
            fetch(
                    `${SERVER_URL}/experience/search?` + new URLSearchParams({
                    s: searchString,
                    r: filters.researchers,
                    a: filters.artifacts,
                    e: filters.entities,
                }).toString(), 
                {
                    method: "get",
                    headers: { "Content-Type": "application/json" },
                }
            )
                .then((res) => res.json())
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }
}

export default ExperienceService;