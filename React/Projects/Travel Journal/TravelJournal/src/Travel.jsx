import React from 'react'

export default function Travel(props) {

  return (


 <div className="travel">
            <img src={`${props.item.imageUrl}`} className="travel--image" />
         <div className="travel--stats">
         <img className="Fill" src="./Fill.png"/>
             <span className="travel--location"><span className="bold">{props.item.location}</span></span>
            <span className="travel--GPSLocation"><a href={props.item.googleMapsUrl} target="_blank" rel="noopener noreferrer">Check it out on Google Maps</a></span>
            <h1 className="travel--title">{props.item.title}</h1>
            <h3 className="travel--startdate">{props.item.startDate} - {props.item.endDate}</h3>
            <p className="travel--desc">{props.item.description}</p>
            <p className='line'></p>
          </div>
        </div>
  )
}