import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { deleteGame, getGames } from "../../managers/GameManager.js"
import "./game.css"

export const GameList = (props) => {
    const [ refresh, setRefresh ] = useState(true)
    const [ games, setGames ] = useState([
        {id: 0,
        name: "",
        description: "",
        game_type: {},
        min_player: 0,
        max_player: 0,
        gamer: {}
        }
    ]
    )
    const navigate = useNavigate()

    function refreshPage() {
        window.location.reload(false)
    }

    useEffect(() => {
        getGames().then(data => setGames(data))
    }, [,refresh])

    const handleClick = (id) => {
        deleteGame(id).then(refreshPage)
    }   

    return (
        <article className="games">
            <button className="btn btn-2 icon-create"
                onClick={() => {
                    navigate({ pathname: "new" })
                }}
            >Register New Game</button>
            {
                games.map(game => {
                    return <section key={`game--${game.id}`} className="game">
                        <div className="game__title">{game.name}</div>
                        <div className="game__players">{game.min_player} players needed</div>
                        <div className="game__skillLevel">Game Type: {game.game_type.label}</div>
                        <div className="game__footer">
                            <button
                                onClick={() => {
                                    navigate({ pathname: `edit/${game.id}`})
                                }}>Edit</button>
                        </div>
                        <div className="game__footer">
                            <button
                                onClick={() => {
                                    handleClick(game.id)
                                }}>Delete</button>
                        </div>
                    </section>
                })
            }
        </article>
    )
}