import Category from "../category";

const SERVER_URL = "http://localhost:8888/api";

class DataService {
    static async createNew(data, category) {
        if (category == Category.EXPERIENCE) {
            console.error("Do not call DataService.createNew to create a new Experience. Use ExperienceService.createNew.");
            return;
        }

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

    static async deleteOne(category, id) {
        return new Promise((resolve, reject) => {
            fetch(`${SERVER_URL}/${category.string}/delete/${id}`, {
                method: "DELETE",
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
