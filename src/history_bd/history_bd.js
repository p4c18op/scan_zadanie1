import AuthService from '../service/AuthService'


export default class Store {
    user = {}
    isAuth = false

    constructor() {
        makeAutoObservable(this)
    }

    setAuth(bool) {
        this.isAuth = bool
    }

    setUser(user) {
        this.user = user
    }

    async login(login, password) {
        try {
            console.log(1)
            const response = await AuthService.login(login, password);
            console.log(2)
            localStorage.setItem('token', response.data.accessToken);
            localStorage.setItem('isAuth', true);

            this.setAuth(true);
            this.setUser(JSON.parse(response.config.data));
        } catch(e) {
            console.log(e)
        }
    }
    async info() {
        try {
            const response = await AuthService.info();
            return(response)
        } catch(e) {
            console.log(e)
        }
    }
    async persons(num) {
        try {
            const response = await AuthService.persons(num);
            console.log(response)
        } catch(e) {
            console.log(e)
        }
    }
    async history() {
        try {
            const response = await AuthService.history();
            console.log(response)
        } catch(e) {
            console.log(e)
        }
    }
    async histograms(request) {
        try {
            const response = await AuthService.histograms(request);
            return response
        } catch(e) {
            console.log(e)
        }
    }

    async documentIds(request) {
        try {
            const response = await AuthService.documentIds(request);
            return response
        } catch(e) {
            console.log(e)
        }
    }

    async documents(array) {
        try {
            const response = await AuthService.documents(array)
            return(response)
        } catch(e) {
            console.log(e)
        }

    }
}