import React, { Component } from 'react'

const NewsItem = (props)=> {
    let {title,description,imageURL,newsURL,author,date,source} = props;  
    return (
      <div>
        <div className="card my-3" style={{width: '18rem'}}>
            <img src={!imageURL?'https://media.cnn.com/api/v1/images/stellar/prod/ap24134604431971-20240628214725876.jpg?c=16x9&q=w_800,c_fill':imageURL} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{props.title}<span className='position-absolute top-0 translate-middle badge rounded-pill bg-danger' style={{left:'90%'}}>{source}
                  <span className='visually-hidden'>unread messages</span>
                  </span></h5>
                <p className="card-text">{description}...</p>
                <p className='card-text'><small className='text-muted'>By {author?author:"unknown"}</small></p>
                <p className='card-text'><small className='text-muted'>On {date}</small></p>
                <a href={newsURL} target="_blank" className="btn btn-sm   btn-dark">Read More</a>
            </div>
            </div>
      </div>
    )
}

export default NewsItem
