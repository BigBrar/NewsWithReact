import React, { useEffect,useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props)=>{
  const [articles,setArticles] = useState([])
  const [loading,setLoading] = useState(false)
  const [page,setPage] = useState(1)
  const [totalResults,setTotalResults] = useState(0)


   const handleNext = async()=>{
    await setPage(page+1)
    update_page()
    console.log("Next clicked...")
  }
  
  const handlePrevious = async()=>{
    await setPage(page-1)
    update_page()
  }

  const update_page = async()=>{
    props.setProgress(10);
    setLoading(true)
    console.log("This is the update page function...")
    let url2 = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`
    props.setProgress(30);
    let data = await fetch(url2)
    props.setProgress(70);
    let parsedData =  await data.json()
    setLoading(false)
    props.setProgress(80);
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    props.setProgress(100);
  }

  useEffect(()=>{
    document.title = `NewsIndia - ${  props.category}`
    update_page();
  },[])
 
  const fetchMoreData = async() => {
    setLoading(true)
    console.log("This is the update fecth more data function...")
    let url2 = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`
    setPage(page+1)
    let data = await fetch(url2)
    let parsedData =  await data.json()
    setLoading(false)
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
    }

  
  
    return (
      <>
        <h2 style={{textAlign:'center',marginTop:'80px'}}>NewsIndia - Top {props.category} Headlines</h2>
        {/* {this.state.loading &&<Spinner/>} */}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >
        <div className='container'>
        <div className='row'>
        {articles.map((element)=>{
           return <div className='col-md-4'key={element.url}>
            <NewsItem title={element.title} description={element.description} imageURL={element.urlToImage} newsURL={element.url} source={element.source.name} author={element.author} date={element.publishedAt}/>
            </div>
          
          })}
        </div>

        </div>
        </InfiniteScroll>

        {/* cf021b32719b40b9af0cd53a8abfe44b */}
        <div className="container d-flex justify-content-between">
        <button disabled={page<=1} type="button" onClick={handlePrevious} className="btn btn-dark">Previous</button>
        <button type="button" onClick={handleNext} className="btn btn-dark">Next</button>
        </div>
      </>
    )
}

News.defaultProps = {
  country:'in',
  pageSize:8,
  category: 'sports'
}
News.propTypes = {
  country:PropTypes.string,
  pageSize:PropTypes.number,
  category: PropTypes.string,
}

export default News
