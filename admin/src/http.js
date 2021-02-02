import axios from 'axios'

const http = axios.create({
    baseURL: 'http://localhost:3330/admin/api'
})

export default http