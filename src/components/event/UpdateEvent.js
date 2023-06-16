import { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { getEventById, updateEvent } from "../../managers/EventManager"
import { getGames } from "../../managers/GameManager"

export const UpdateEvent = () => {
    const navigate = useNavigate()
    const [games, setGames] = useState([
       {
        id: 0
       } 
    ])
    const { eventId } = useParams()

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentEvent, setCurrentEvent] = useState({
        date_of_event: "",
        start_time: "",
        location: "",
        game: [],
    })

    useEffect(() => {
        // TODO: Get the game types, then set the state
        getEventById(eventId).then((data) => {
            setCurrentEvent(data)
        })
        getGames().then(res => setGames(res))
    }, [eventId])

    const changeEventState = (event) => {
        const copy = { ...currentEvent }
        copy[event.target.name] = event.target.value
        setCurrentEvent(copy)
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Update your event:</h2>
            <fieldset>
                <div className="form-group">
                <label className="label">Event Game: </label>
                <select
                        name="game_type"
                        required
                        className="form-control"
                        value={currentEvent.game.id}
                        onChange={(event) => {
                            const copy = { ...currentEvent }
                            copy.game = parseInt(event.target.value)
                            setCurrentEvent(copy)
                        }}>
                        {games.map(game => ( 
                                    <option key={`game_type--${game.id}`} value={game.id} name={game.name}>{game.name}</option>                         
                            ))}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="location">Location of Event:</label>
                    <input type="text" name="location" required className="form-control"
                        value={currentEvent.location}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date_of_event">Date of Event:</label>
                    <input type="date" name="date_of_event" required className="form-control"
                        value={currentEvent.date_of_event}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="start_time">Time of Event:</label>
                    <input type="time" name="start_time" required className="form-control"
                        value={currentEvent.start_time}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset> 
            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const event = {
                        date_of_event: currentEvent.date_of_event,
                        start_time: currentEvent.start_time,
                        location: currentEvent.location,
                        game: currentEvent.game.id,
                        host: ""
                    }

                    // Send POST request to your API
                    updateEvent(event, eventId)
                        .then(() => navigate("/events"))
                }}
                className="">Update Event</button>
        </form>
    )
}