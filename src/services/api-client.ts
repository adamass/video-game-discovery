import axios from 'axios';

export default axios.create({
    baseURL: 'https://api.rawg.io/api',
    params: {
        key: 'ed6cd85864f444bb9a5b77be4031addb'
    }
})