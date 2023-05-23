import React, { useEffect, useState } from "react"
import { getGames } from "../../managers/GameManager.js"

export const GameList = (props) => {
    const [ games, setGames ] = useState([])

    useEffect(() => {
        getGames().then(data => setGames(data))
    }, [])

    return (
        <article className="games">
            {
                games.map(game => {
                    return <section key={`game--${game.id}`} className="game">
                        <div className="game__title">{game.name}:</div>
                        <div className="game__type">Game Type: {game.game_type}</div>
                        <div className="game__description">Game Description: {game.description}</div>
                        <div className="game__players">{game.min_players} Minimum Players Needed</div>
                        <div className="game__players">{game.max_players} Maximum Players Needed</div>
                    </section>
                })
            }
        </article>
    )
}