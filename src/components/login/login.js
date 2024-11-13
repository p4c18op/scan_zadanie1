import React, {useContext, useEffect, useState} from 'react'
import { Context } from '../..'
import './login.css'

const LoginForm = () => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [person , setPerson] = useState('')
    const {store} = useContext(Context);
    const [form, setForm] = useState(true)
    const [validForm, setValidForm] = useState(false)
    const [loginValid, setLoginValid] = useState(false)
    const clientWidth = document.documentElement.clientWidth
    const navigate = useNavigate()

    useEffect(() => {
        if (login != '' && password != '' && !validForm) {
            setValidForm(true)
        }
        if (login == '' && password == '' && validForm) {
            setValidForm(false)
        }
    })

    const handleLogin = () => {
        store.login(login, password)
        navigate('/')
    }

    return (
        <div className='login-form-container'>
            <div className='big-text-container'>
                Для оформления подписки на тариф, необходимо авторизоваться.
                {clientWidth < 900 ? null :
                <img src={require('./login.png')} className='image'></img>
                }
            </div>
            <div className='input-container-outer'>
                <img src={require('./i.png')} className='input-image'></img>
                <div className='input-container-inner'>
                    <div className='switch'>
                        <div className={form ? 'sign-in-toggle active-text' : 'sign-in-toggle'} onClick={() => setForm(true)}>
                            Войти
                            <div className={form ? 'sign-in-underline active-underline' : 'sign-in-underline'}></div>
                        </div>
                        <div className={form ? 'sign-up-toggle' : 'sign-up-toggle active-text'} onClick={() => setForm(false)}>
                            Зарегистрироваться
                            <div className={form ? 'sign-up-underline' : 'sign-up-underline active-underline'}></div>
                        </div>
                    </div>
                    <div className='login-password-container '>
                        <div className='login-container'>
                            Логин или номер телефона:
                            <input className='input'
                                type="text"
                                value={login}
                                placeholder=''
                                onChange={(e) => {
                                    setLogin(e.target.value)
                                }}
                            />
                        </div>
                        <div className='password-container'>
                            Пароль:
                            <input className='input'
                                type="password"
                                value={password}
                                placeholder=''
                                onChange={(e) => {setPassword(e.target.value)}}
                            />
                        </div>
                    </div>
                    <button onClick={validForm ? handleLogin : null}
                            className={validForm ? 'insert-btn' : 'insert-btn-inactive'}>
                        Войти
                    </button>
                    <a className='password-recovery-btn'>Восстановить пароль</a>
                    </div>
                </div>
            <div className='footer-img-container'>
                <img src={require('./login.png')} className='image'></img>
            </div>
                : null }
        </div>


    );
}
export default observer(LoginForm);