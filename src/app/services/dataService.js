const SERVER_URL = "http://localhost:8888/api";

class DataService {
    /**
     * Enum for endpoints.
     * @readonly
     * @enum {{name: string, hex: string}}
     */
    static DataType = Object.freeze({
        RESEARCHER:   { string: "researcher"},
        ARTIFACT:  { string: "artifact"},
        ENTITY: { string: "entity"}
    });
  
    static async createNew(data, endpoint) {
        console.log("Creation of researcher.");
        console.log(JSON.stringify(data));

        return new Promise((resolve, reject) => {
            fetch(`${SERVER_URL}/${endpoint.string}/new`, {
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

    // getting all from database (implement limit?)
    static async getAll(endpoint) {
        return new Promise((resolve, reject) => {
            fetch(`${SERVER_URL}/${endpoint.string}/get_all`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            })
                .then((res) => res.json())
                .then((res) => {
                    // const data = res.data;
                    resolve(res);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }
}

export default DataService;
