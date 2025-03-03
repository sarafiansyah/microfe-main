import users from "../../../data/users.json";

export const login = async (username, password) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const user = users.find(
                (u) => u.username === username && u.password === password
            );

            if (user) {
                localStorage.setItem("user", JSON.stringify(user));
                resolve({ status: 200, message: "Login successful!", user });
            } else {
                reject({
                    status: 401,
                    message: "Invalid username or password!",
                });
            }
        }, 1000);
    });
};
