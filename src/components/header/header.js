import React from 'react'
import userData from './user/user.js'
import userInfo from './user/userInfo1.js'
import { Link } from 'react-router-dom'
import './header.css'

class Header extends React.Component {
  constructor(){
    super()
    this.clientWidth = document.documentElement.clientWidth
    {localStorage.isAuth
    ?
      this.isAuth = true
    :
      this.isAuth = false
    }
    this.state = {
      isActive : false,
    }
  }
  handleClick = () => {
    this.setState(prevState => ({
      isActive: !prevState.isActive
    }))};

  clean = () => {
    console.log(1)
    localStorage.setItem('requestData', null)
    localStorage.setItem('histograms', null)
    localStorage.setItem('ids', null)
    localStorage.setItem('documents', null)

  };

    render() {
      return (
        <header className={this.clientWidth < 900 ? 'main-cont-mobile' : 'main-cont'}>

          {this.clientWidth < 900
          ?
            <div className='cont-unspecified'>
              <div className={this.state.isActive ? 'main-header-cont-mobile-active' : 'main-header-cont-mobile'}>
                <img src={require(this.state.isActive ? '../footer/footer_scan.png' :'./header.png')}
                    className={this.state.isActive ? 'logo-mobile-active' : 'logo-mobile'}/>
                {this.isAuth
                ?
                  <userInfo/>
                :
                  null
                }
                <div className={this.state.isActive ? 'burger-cont-active' : "burger-cont"} onClick={() => {this.handleClick()}}>
                  <span className="burger"></span>
                  <span className="burger"></span>
                  <span className="burger"></span>
                </div>
              </div>
              <div className={this.state.isActive ? 'drop-down' : 'drop-down-hidden'}
                    id={this.state.isAuth ? '' : 'drop-down-unauth' }>
                <nav className='nav-bar-extra'>
                  <Link className='link-to white-text' to='/'>Главная</Link>
                  <a>Тарифы</a>
                  <a>FAQ</a>
                </nav>
                <div>
                {this.isAuth ?
                  <div className='user-part-container'>
                    <div className='user-badge-container'>
                      <div className='user-name-container '>
                        <div>{`${userData.firstName} ${userData.secondName.charAt(0)}.`}</div>
                        <button className='user-exit-btn'
                          onClick={() => {
                          console.log(1)
                          localStorage.setItem('requestData', null)
                          localStorage.setItem('histograms', null)
                          localStorage.setItem('ids', null)
                          localStorage.setItem('documents', null)
                          localStorage.setItem('token', null);
                          localStorage.setItem('isAuth', '');
                          }}>
                          Выход
                        </button>
                      </div>
                      <img src={userData.avatar} className='user-avatar'></img>
                    </div>
                  </div>
                :
                  <div className='user-sign-mobile'>
                    <a className='sign-up-btn'>Зарегистрироваться</a>
                    <div className='sign-in-btn'>
                      <Link className='link-to' to='/login'>Войти</Link>
                    </div>
                  </div>
                }
                </div>
              </div>
            </div>
          :
          <div className='cont-unspecified'>

          <img src={require('./header.png')}/>
          <div className='main-header-cont'>

              <div className="nav-cont">
                  <nav className='nav-bar'>
                  <Link className='link-to' to='/'>Главная</Link>
                  <a>Тарифы</a>
                  <a>FAQ</a>
                  </nav>
              </div>
              {this.isAuth ?
                <div className='user-part-container'>
                  <userInfo/>
                  <div className='user-badge-container'>
                    <div className='user-name-container '>
                      <div>{`${userData.firstName} ${userData.secondName.charAt(0)}.`}</div>
                        <button className='user-exit-btn'
                          onClick={() => {
                          localStorage.setItem('token', null);
                          localStorage.setItem('isAuth', '');
                          }}>
                          Выход
                        </button>
                    </div>
                    <img src={userData.avatar} className='user-avatar'></img>
                  </div>
                </div>
              :
              <div className='user-sign'>
                  <a>Регистрация</a> |
                  <div className='sign-in-btn'>
                    <Link className='link-to' to='/login'>Войти</Link>
                  </div>
              </div>
              }
          </div>
          <div className="burger-cont" onClick={() => {this.handleClick()}}>
              <span className="burger"></span>
              <span className="burger"></span>
              <span className="burger"></span>
          </div>

          </div>
          }

        </header>
    )};
}

export default Header;