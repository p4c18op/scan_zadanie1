import $api from '../axios/index'
import {AxiosResponse}from 'axios'
import {BASE_URL} from '../global'

export default class UserService {
    static fetchUsers = () => {
        return $api.get( BASE_URL + '/users')
    }

}