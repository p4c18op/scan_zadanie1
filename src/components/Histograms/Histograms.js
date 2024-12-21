import React, {useContext, useEffect, useState} from 'react'
import { Context } from '../..'
import {observer} from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'
import './Histograms.css'

const HistogramsForm = () => {
    const {store} = useContext(Context);
    const [inn, setInn] = useState('')
    const [tonality, setTonality] = useState('')
    const [limit, setLimit] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [maxFullness, setMaxFullness] = useState(false)
    const [inBusinessNews, setInBusinessNews] = useState(false)
    const [onlyMainRole, setOnlyMainRole] = useState(false)
    const [onlyWithRiskFactors, setOnlyWithRiskFactors] = useState(false)
    const [excludeTechNews, setExcludeTechNews] = useState(false)
    const [excludeAnnouncements, setExcludeAnnouncements] = useState(false)
    const [excludeDigests, setExcludeDigests] = useState(false)

    const [formValid, setFormValid] = useState(false)
    const [dateValid, setDateValid] = useState(false)
    const [innValid, setInnValid] = useState(false)
    const [tonalityValid, setTonalityValid] = useState(false)
    const [limitValid, setLimitValid] = useState(false)

    const clientWidth = document.documentElement.clientWidth
    const navigate = useNavigate()

    const innValidation = () => {
        const n1 = inn[0] * 2
        const n2 = inn[1] * 4
        const n3 = inn[2] * 10
        const n4 = inn[3] * 3
        const n5 = inn[4] * 5
        const n6 = inn[5] * 9
        const n7 = inn[6] * 4
        const n8 = inn[7] * 6
        const n9 = inn[8] * 8
        let control = n1+n2+n3+
                      n4+n5+n6+
                      n7+n8+n9
        control = control%11
        if (control == inn[9] && inn.length < 11) {
            setInnValid(true)
            return true
        } else {
            setInnValid(false)
            return false


        }
    }

    const dateValidation = () => {
        const dateStart = new Date(startDate)
        const dateEnd = new Date(endDate)
        const current = new Date()

        if (dateStart.getTime() < current.getTime() &&
            dateEnd.getTime() < current.getTime() &&
            dateStart.getTime() < dateEnd.getTime()) {
            setDateValid(true)
            return true
        }
        setDateValid(false)
        return false
    }

    const tonalityValidation = () => {
        if(tonality == '') {
            setTonalityValid(false)
            return false
        }
        setTonalityValid(true)
        return true
    }

    const limitValidation = () => {
        const numLimit = Number(limit)
        if(numLimit < 0 || numLimit > 100 || limit == ''){
            setLimitValid(false)
            return false
        }
        setLimitValid(true)
        return true
        }

    const request = () => {
        {if (dateValidation() && innValidation() && limitValidation() && tonalityValidation()) {
            const requestData = JSON.stringify(
            {
                issueDateInterval: {
                  startDate: `${startDate}T00:00:00+03:00`,
                  endDate: `${endDate}T23:59:59+03:00`
                },
                searchContext: {
                  targetSearchEntitiesContext: {
                    targetSearchEntities: [{
                      type: "company",
                      inn: inn,
                      maxFullness: maxFullness,
                    }],
                    onlyMainRole: onlyMainRole,
                    tonality: tonality,
                    onlyWithRiskFactors: onlyWithRiskFactors,
                  }
                },
                attributeFilters: {
                  excludeTechNews: excludeTechNews,
                  excludeAnnouncements: excludeAnnouncements,
                  excludeDigests: excludeDigests,
                },
                limit: Number(limit),
                sortType: "sourceInfluence",
                sortDirectionType: "desc",
                intervalType: "month",
                histogramTypes: ["totalDocuments", "riskFactors"]
              })
              localStorage.setItem('requestData', requestData);
              navigate('/searchres')
            }}
    }

    useEffect(() => {
        innValidation()
        dateValidation()
        limitValidation()
        tonalityValidation()
        if (dateValidation() && innValidation() && limitValidation() && tonalityValidation()) {
            setFormValid(true)
        } else {
            setFormValid(false)
        }
    }, [inn, startDate, endDate, tonality, limit])

    return (
        <div className='histograms-main-cont'>
            <div className='histograms-cont'>
                <div className='histograms-text-cont'>
                    <div className='histograms-big-text'>Поиск необходимых данных.</div>
                    <div className='small-text-cont '>
                        {clientWidth < 900
                        ?
                        <div className='small-text-row'>
                            Задайте параметры поиска.
                            Больше информации - точнее поиск данных.
                        </div>
                        :
                        <div>

                            <p className='small-text-row'>Задайте параметры поиска.</p>
                            <p className='small-text-row'>Больше информации - точнее поиск данных.</p>
                        </div>
                        }
                    </div>
                </div>
                {clientWidth < 900
                ?
                <div className='top-image-cont-mobile'>
                    <img src={require('./foto.png')}></img>
                </div>
                : null}

                <div className='histograms-form-cont'>
                    <div className='inputs-cont'>
                        <div className='top-input-cont histograms-input-cont'>
                            ИНН компании*
                            <input
                            className='inn-input histograms-input'
                            type='text'
                            value={inn}
                            onChange={(e) => {setInn(e.target.value)}}/>
                        </div>
                        <div className='err-msg-cont'>{innValid ? '' : 'Введите корректные данные'}</div>
                        <div className='histograms-input-cont'>
                            Тональность*
                            <select
                                className='tonality-input histograms-input'
                                value={tonality}
                                onChange={(e) => {setTonality(e.target.value)}}>
                                <option value=''>выберите тональность</option>
                                <option value='positive'>позитивная</option>
                                <option value='negative'>негативная</option>
                                <option value='any'>любая</option>
                            </select>
                        </div>
                        <div className='err-msg-cont'>{tonalityValid ? '' : 'выберите тональность'}</div>
                        <div className='histograms-input-cont'>
                            Количество документов в выдаче*
                            <input
                            className='tonality-input histograms-input'
                            type='text'
                            placeholder='1-100'
                            value={limit}
                            onChange={(e) => {setLimit(e.target.value)}}/>
                        </div>
                        <div className='err-msg-cont'>{limitValid ? '' : 'Введите число от 1 до 100'}</div>
                        <div className='histograms-input-cont'>
                            Диапазон поиска*
                            <div className='date-inputs-cont'>
                                <input
                                    className='date-input histograms-input'
                                    type='date'
                                    placeholder='дата начала'
                                    value={startDate}
                                    onChange={(e) => {setStartDate(e.target.value)}}/>
                                <input
                                    className='date-input histograms-input'
                                    type='date'
                                    placeholder='дата конца'
                                    value={endDate}
                                    onChange={(e) => {setEndDate(e.target.value)}}/>
                            </div>
                            <div className='err-msg-dates-cont'>{dateValid ? '' : 'введите даты от и до в прошлом времени'}</div>
                        </div>
                        {clientWidth < 900
                        ?
                        <div className='confirm-button-cont'>
                            <div className='confirm-button-wrap'>
                                <button
                                    className={formValid ? 'confirm-button' : 'confirm-button-inactive'}
                                    onClick={formValid ? request : null}
                                >
                                    Поиск
                                </button>
                                <div className='text-under-button'>
                                    * обязательные к заполнению поля
                                </div>
                            </div>
                        </div>
                        : null}
                    </div>
                    {clientWidth < 900
                    ?
                    null
                    :
                    <div className='checkboxes-cont'>
                        <div className='checkbox-cont'>
                            <input
                                className='checkbox histograms-checkbox'
                                type='checkbox'
                                checked={maxFullness}
                                onChange={() => {setMaxFullness(!maxFullness)}}/>
                                <span className={maxFullness ? '' : 'checkbox-disabled'}>Признак максимальной полноты</span>
                        </div>
                        <div className='checkbox-cont'>
                            <input
                                className='checkbox histograms-checkbox'
                                type='checkbox'
                                checked={inBusinessNews}
                                onChange={() => {setInBusinessNews(!inBusinessNews)}}/>
                            <span className={inBusinessNews ? '' : 'checkbox-disabled'}>Упоминания в бизнес контексте</span>
                        </div>
                        <div className='checkbox-cont'>
                            <input
                                className='checkbox histograms-checkbox'
                                type='checkbox'
                                checked={onlyMainRole}
                                onChange={() => {setOnlyMainRole(!onlyMainRole)}}/>
                                <span className={onlyMainRole ? '' : 'checkbox-disabled'}>Главная роль в публикации</span>
                        </div>
                        <div className='checkbox-cont'>
                            <input
                                className='checkbox histograms-checkbox'
                                type='checkbox'
                                checked={onlyWithRiskFactors}
                                onChange={() => {setOnlyWithRiskFactors(!onlyWithRiskFactors)}}/>
                                <span className={onlyWithRiskFactors ? '' : 'checkbox-disabled'}>Публикации только с риск-факторами</span>
                        </div>
                        <div className='checkbox-cont'>
                            <input
                                className='checkbox histograms-checkbox'
                                type='checkbox'
                                checked={excludeTechNews}
                                onChange={() => {setExcludeTechNews(!excludeTechNews)}}/>
                                <span className={excludeTechNews ? '' : 'checkbox-disabled'}>Включать технические новости рынков</span>
                        </div>
                        <div className='checkbox-cont'>
                            <input
                                className='checkbox histograms-checkbox'
                                type='checkbox'
                                checked={excludeAnnouncements}
                                onChange={() => {setExcludeAnnouncements(!excludeAnnouncements)}}/>
                                <span className={excludeAnnouncements ? '' : 'checkbox-disabled'}>Включать анонсы и календари</span>
                        </div>
                        <div className='checkbox-cont'>
                            <input
                                className='checkbox histograms-checkbox'
                                type='checkbox'
                                checked={excludeDigests}
                                onChange={() => {setExcludeDigests(!excludeDigests)}}/>
                                <span className={excludeDigests ? '' : 'checkbox-disabled'}>Включать сводки новостей</span>
                        </div>
                        {clientWidth < 900 ? null
                        :
                        <div className='confirm-button-cont'>
                            <div className='confirm-button-wrap'>
                                <button
                                    className={formValid ? 'confirm-button' : 'confirm-button-inactive'}
                                    onClick={formValid ? request : null}
                                >
                                    Поиск
                                </button>
                                <div className='text-under-button'>
                                    * обязательные к заполнению поля
                                </div>
                            </div>
                        </div>
                        }
                    </div>
                    }
                </div>
            </div>
            <div className='histograms-big-image-cont'>
                <img src={require('./foto.png')}></img>
            </div>
        </div>
        
    );
}

export default observer(HistogramsForm);
