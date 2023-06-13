import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { deleteEvent, getEvents, joinEvent, leaveEvent } from "../../managers/EventManager"
import { EventDate } from "../utils/Date"
import { EventTime } from "../utils/Time"
import "./events.css"

export const EventList = (props) => {
    const [ events, setEvents ] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }, [])

    const handleClick = (id) => {
        deleteEvent(id)
        .then(() => {
            getEvents().then(data => setEvents(data))
        })
    }  

    return (
        <article className="events">
            <button className="btn btn-2 icon-create"
                onClick={() => {
                    navigate({ pathname: "new" })
                }}
            >Register New Event</button>
            {
                events.map(event => {
                    return <section key={`event--${event.id}`} className="event">
                        <div className="event__game">WHAT: {event.game.name}</div>
                        <div className="event__date">WHEN: <EventDate date={event.date_of_event}/> at <EventTime time={event.start_time}/></div>
                        <div className="event__location">WHERE: {event.location}</div>
                        <div className="event__host">Event Host: {event.host.full_name}</div>
                        <div className="event__footer">
                            <button
                                onClick={() => {
                                    navigate({ pathname: `edit/${event.id}`})
                                }}>Edit</button>
                            <button
                                onClick={() => {
                                    handleClick(event.id)
                                }}>Delete</button>
                            {
                                event.joined 
                                ?
                                    <button
                                    onClick={() => {
                                        leaveEvent(event.id)
                                        .then(() => {
                                            getEvents().then(data => setEvents(data))
                                        })
                                    }}>Leave</button>
                                :
                                    <button
                                    onClick={() => {
                                        joinEvent(event.id)
                                        .then(() => {
                                            getEvents().then(data => setEvents(data))
                                        })
                                    }}>Join</button>
                            }                        
                        </div>
                    </section>
                })
            }
        </article>
    )
}