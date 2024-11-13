import $api from '../ste/index'
import {AxiosResponse} from 'axios'
const BASE_URL = 'https://gateway.scan-interfax.ru';

export default class AuthService {
    static login = (login, password) => {
        return $api.post( BASE_URL + '/api/v1/account/login', {
            login: login,
            password: password
        })
    }
    static info = () => {
        return $api.get(BASE_URL + '/api/v1/account/info')
    }
    static histograms = (request) => {

        return $api.post( BASE_URL + '/api/v1/objectsearch/histograms', request);
    }
    static documentIds = (request) => {

      return $api.post( BASE_URL + '/api/v1/objectsearch', request);
    }
    static documents = (array) => {
      const response = $api.post( BASE_URL + '/api/v1/documents', {ids : array});
      return response
    }
    static persons = (num) => {
        return $api.post(BASE_URL + '/api/v1/entities/persons', [num])
    }
    static history = () => {
        return $api.get(BASE_URL + '/api/v1/account/purchaseHistory')
    }
}