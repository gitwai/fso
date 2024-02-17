import axios from 'axios'
const baseURL = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseURL)
    return request.then(res => res.data)
}

const create = newObject => {
    const request = axios.post(baseURL, newObject)
    return request.then(res => res.data)
}

const remove = id => {
    const request = axios.delete(`${baseURL}/${id}`)
    return request.then(res => res.data)
}

const put = newObject => {
    const request = axios.put(`${baseURL}/${newObject.id}`, newObject)
    return request.then(res => res.data)
}

export default {
    getAll,
    create,
    remove,
    put,
}
