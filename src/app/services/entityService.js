const url = "http://localhost:8888/api/entity";

class EntityService {
    static async createNew(data) {
        console.log("Creation of entity.");
        console.log(JSON.stringify(data));

        return new Promise((resolve, reject) => {
            fetch(`${url}/new`, {
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

export default EntityService;
