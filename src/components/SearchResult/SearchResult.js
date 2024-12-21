import React, {useContext, useEffect, useState} from 'react'
import { Context } from '../..'
import './SearchResult.css'

const SearchResult = () => {
    const {store} = useContext(Context)
    const [response, setResponse] = useState(false)
    const [totalIds, setTotalIds] = useState(null)
    const [idsNothingFound, setIdsNothingFound] = useState(false)
    const [histogramsNothingFound, setHistogramsNothingFound] = useState(false)
    const [error, setError] = useState('')
    const [page, setPage] = useState(1)
    const itemsPerPage = 10
    const clientWidth = document.documentElement.clientWidth
    const [totalData, setTotalData] = useState(null)
    const [visibleData, setVisibleData] = useState(null)
    const request = JSON.parse(localStorage.getItem('requestData'))

  const fetchData = async () => {
    try {
        const histograms = await store.histograms(request);
        const ids = await store.documentIds(request);


        if (histograms.data.data.length === 0) {
          setHistogramsNothingFound(true)
        }
        setResponse(histograms);

        if (ids.data.items.length === 0) {
          setIdsNothingFound(true)
          return null
        }
        const array = await ids.data.items.map((item) => item.encodedId)
        setTotalIds(array)

        const response = await store.documents(array);
        setTotalData(response);
        setVisibleData(response.data.slice(0, page * itemsPerPage))
    } catch (e) {
        setError(e);
        console.log(e)
    }
};

  const showMore = () => {
    setPage(page+1)
  }

  const changePage = () => {
      if (totalData) {
        return  totalData.data.slice(0, page * itemsPerPage)
    }};
    useEffect(() => {
      fetchData()
    }, [])

    useEffect(() => {
        setVisibleData(changePage())
    }, [page])



    return (
      <div className='searchres-main-cont'>
        <div className='searchres-top-part'>
          <div>
            <div className='searchres-big-text margin-top'>
              <p>Поиск</p>
            </div>
            <div className='searchres-small-text margin-top'>
              <p>Поиск может занять некоторое время.</p>
            </div>
          </div>
          <div>
            <img src={require('./Search.png')} className='searchres-mobile-img'></img>
          </div>
        </div>
        <div>
          <p className='searchres-smaller-big-text'>общая сводка</p>
          <p className='variants-count-text'>
          {histogramsNothingFound ?
            'ничего не найдено'
          :
            response ?
              `Найдено ${response.data.data[0].data.length} вариантов`
            :
              'загрузка..'
          }
          </p>
          <div className='variants-cont'>
            <div className='variants-hints-cont'>
              <div  className='variants-hints'>
                <p>Период</p>
                <p>Всего</p>
                <p>Риски</p>
              </div>
            </div>
          </div>
          <div>
            <p className='searchres-smaller-big-text'>список документов</p>
            <div className='show-more-btn-cont'>
              <button onClick={() => {showMore()}} className='show-more-btn'>Показать больше</button>
            </div>
          </div>
        </div>
      </div>
    );
}

export default SearchResult;