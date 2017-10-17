import axios from 'axios';
import {api, headers} from '../utils/helpers'
import {FETCH_CATEGORIES} from './types'

axios.defaults.headers.common['Authorization'] = headers

export function fetchCategories() {
    return  dispatch => {axios.get(`${api}/categories`)
        .then(res => dispatch(fetchCategoriesSuccess(res.data)))
    }
}

function fetchCategoriesSuccess(data) {
    return {
        type: FETCH_CATEGORIES,
        payload: data
    };
}