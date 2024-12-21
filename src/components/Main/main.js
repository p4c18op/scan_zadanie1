import React, {useState} from 'react'
import userData from '../header/user/user.js'
import { Link } from 'react-router-dom'
import './main.css'

class Main extends React.Component {
  constructor() {
    super()
    {localStorage.isAuth
    ?
      this.isAuth = true
    :
      this.isAuth = false
    }
  }

  render() {
    return (
      <div className='main-page-container'>
        <div className='main-page-top'>
          <div className='request-container'>
            <div className='big-text'>
              <p>Cервис поиска публикаций компании по его ИНН</p>
            </div>
            <div className='small-text'>
              <p>Комплексный анализ публикаций, получение данных в формате PDF на электронную почту.</p>
            </div>
            <div className='request-btn-container'>
              {this.isAuth ?
              <Link
                to='/histogramform'
                className='request-btn'>
                <div>Запросить данные</div>
              </Link>
              :
              <div className='display-hide'>
                <div>Запросить данные</div>
              </div>
              }
            </div>
          </div>
        </div>
        <div className='main-page-slider'>
          <div className='big-text bit-margin-left'>
            Почему вы выбрали именно нас
          </div>
        </div>
        <div>
          <div className='tariffs'>
            <div className='tariff'>
              <div className='tariff-header'>
                <div className='tariff-header-cont'>
                  <div className='tariff-header-bigger-text'>Newcomer</div>
                  <div className='tariff-header-smaller-text'>Для небольшого исследования</div>
                  <div className='tariff-inner'>
                    <div className='current-tariff-badge-container'>
                      {userData.tariff == 'newcomer'
                      ?
                        <p className='current-tariff-badge'><span>Текущий тариф</span></p>
                      :
                        <p className='current-tariff-badge tariff-badge-hidden '><span>Текущий тариф</span></p>
                      }
                    </div>
                  </div>
                  <div>
                    <div className='tariff-current-price'>598 ₽ <span className='tariff-previous-price'>1 198 ₽</span></div>
                    <div className='tariff-installment-plan '>или 139 ₽/мес. при рассрочке на 24 мес.</div>
                  </div>
                  <div className='tariff-feature-list'> В тариф входит:
                    <ul>
                      <li>Безлимитная история запросов</li>
                      <li>Безопасная сделка</li>
                      <li>Поддержка 24/7</li>
                    </ul>
                  </div>
                  <div className='tariff-button-container'>
                    {userData.tariff == 'newcomer'
                    ?
                      <div className='tariff-button grey'>Перейти в личный кабинет</div>
                    :
                      <div className='tariff-button'>Подробнее</div>
                    }
                  </div>
                </div>
              </div>
            </div>
            <div className='tariff'>
              <div className='tariff-header'>
                <div className='tariff-header-cont'>
                  <div className='tariff-header-bigger-text'>Pro</div>
                  <div className='tariff-header-smaller-text'>Для HR и фрилансеров</div>
                </div>
              </div>
              <div className='tariff-inner'>
                <div className='current-tariff-badge-container'>
                  {userData.tariff == 'pro'
                  ?
                    <p className='current-tariff-badge'><span>Текущий тариф</span></p>
                  :
                    <p className='current-tariff-badge tariff-badge-hidden '><span>Текущий тариф</span></p>
                  }
                </div>
                <div>
                  <div className='tariff-current-price'>1 499 ₽ <span className='tariff-previous-price'>2999 ₽</span></div>
                  <div className='tariff-installment-plan '>или 299 ₽/мес. при рассрочке на 24 мес.</div>
                </div>
                <div className='tariff-feature-list'> В тариф входит:
                  <ul>
                    <li>Все пункты тарифа Newcomer</li>
                    <li>Экспорт истории</li>
                    <li>Рекомендации по приоритетам</li>
                  </ul>
                </div>
                <div className='tariff-button-container'>
                  {userData.tariff == 'pro'
                  ?
                    <div className='tariff-button grey'>Перейти в личный кабинет</div>
                  :
                    <div className='tariff-button'>Подробнее</div>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  )};
}

export default Main;