import React from 'react'

export default function Travel(props) {

  return (

 <div className="travel">

            <img src={`${props.item.imageUrl}`} className="travel--image" />
            {/* <div className="card--stats">
                <img src="../images/star.png" className="card--star" />
                <span>{props.item.stats.rating}</span>
                <span className="gray">({props.item.stats.reviewCount}) • </span>
                <span>{props.item.title}</span>
            </div> */}
      
            <p className="travel--location"><span className="bold">{props.item.location}</span></p>
            <p className="travel--GPSLocation">{props.item.googleMapsUrl} View on Google Maps</p>
            <h1 className="travel--title">{props.item.title}</h1>
            <h3 className="travel--startdate">{props.item.startDate} - {props.item.endDate}</h3>
            <p className="travel--desc">{props.item.description}</p>
        </div>

  )
}