import React from 'react'
import './scoreStyle.scss'

const ScoreComponent = (props) => {

    const scoreChange = (event) => {
        console.log("Changing")

    }
    return (
        <nav className='ScoreComponent'>
            <img className='ScoreComponent-titleImage' src="/images/logo.svg" alt="score-title" />
            <div className="ScoreComponent-scoreContainer">
                <p className='ScoreComponent-name'>score</p>
                <p onChange={scoreChange} id='ScoreComponent-score'>0</p>
            </div>
        </nav>
    )
}

export default ScoreComponent