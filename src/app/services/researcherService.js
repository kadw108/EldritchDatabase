const url = "http://localhost:8888/api/researcher";

class ResearcherService {
    static async createNew(data) {
        console.log("Creation of researcher.");
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

export default ResearcherService;
