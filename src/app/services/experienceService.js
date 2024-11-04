const SERVER_URL = "http://localhost:8888/api";

class ExperienceService {
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
}

export default ExperienceService;

