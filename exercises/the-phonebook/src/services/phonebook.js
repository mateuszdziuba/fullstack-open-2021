import axios from 'axios'
const url = 'http://localhost:3001/phonebook'

const getAll = () => {
    const request = axios.get(url)
    return request.then(response => response.data)
}

const create = (entry) => {
    const request = axios.post(url, entry)
    return request.then(response => response.data)
}

const update = (id, entry) => {
    const request = axios.put(`${url}/${id}`, entry)
    return request.then(response => response.data)
}

const remove = (id) => {
    axios.delete(`${url}/${id}`)
}

export default { getAll, create, update, remove }