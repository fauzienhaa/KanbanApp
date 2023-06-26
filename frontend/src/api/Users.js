import Axios from "axios";

export const getUsers = async () => {
    const projects = await Axios.get("http://127.0.0.1:5000/users")
    return projects.data
};

export const getUserById = async (id) => {
    const projectId = await Axios.get(`http://127.0.0.1:5000/users/${id}`)
    return projectId.data
}

export const searchProject = async (q) => {
    const search = await Axios.get(q);
    console.log(q);
}