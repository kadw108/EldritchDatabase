const SERVER_URL = "http://localhost:8888/api";

class DataService {
    static async createNew(data, category) {
        console.log("Creation of object.");
        console.log(JSON.stringify(data));

        return new Promise((resolve, reject) => {
            fetch(`${SERVER_URL}/${category.string}/new`, {
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
    static async getAll(category) {
        return new Promise((resolve, reject) => {
            fetch(`${SERVER_URL}/${category.string}/get_all`, {
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

    static async getOne(category, id) {
        return new Promise((resolve, reject) => {
            fetch(`${SERVER_URL}/${category.string}/get/${id}`, {
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
