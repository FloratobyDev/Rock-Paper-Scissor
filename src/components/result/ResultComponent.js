import anime from 'animejs/lib/anime.es.js';
import React, { useEffect, useRef } from 'react'
import { GameState } from '../../types/Statetype';
import './resultStyle.scss'
const ResultComponent = (props) => {


    const keyColorPairs = {
        rock: {
            bg: 'hsl(349, 70%, 56%)',
            bs: 'inset hsl(349, 70%, 43%) 0 -6px'
        },
        scissor: {
            bg: 'hsl(40, 84%, 53%)',
            bs: 'inset hsl(39, 89%, 40%) 0 -6px'
        },
        paper: {
            bg: 'hsl(230, 89%, 65%)',
            bs: 'hsl(230, 89%, 52%) 0 6px'
        },
    }

    let itemPickedRef = props.itemPicked.current
    let playerColor = keyColorPairs[props.itemPicked.current.playerPicked]
    let enemyColor = keyColorPairs[props.itemPicked.current.enemyPicked]

    let itemPicked = props.itemPicked.current
    let resultRef = useRef(null)


    const handleSound = (audioName, volume = .5) => {
        const clickSound = new Audio(`/${audioName}.wav`)
        clickSound.volume = volume
        clickSound.play()
    }

    useEffect(() => {
        if (resultRef.current !== null) {
            anime({
                targets: resultRef.current,
                scale: [4, 1],
                delay: 60,
                duration: 300,
                easing: 'easeInOutQuart'
            })
        }
    }, [])


    if (itemPicked.result === 'You won!') {
        handleSound('success')
        props.scoreRef.current += 1;
        const scoreElement = document.querySelector('#ScoreComponent-score')
        scoreElement.textContent = props.scoreRef.current
        anime({
            targets: scoreElement,
            color: '#000',
            scale: [.7, 1.5, 1],
            duration: 400,
            easing: 'easeInOutSine',
            loop: false,
        })
        playerColor.bs += ',rgba(124, 124, 124, 0.462) 0 0 0 30px, rgba(113, 113, 113, 0.200) 0 0 0 70px, rgba(101, 101, 101, 0.100) 0 0 0 110px'

    }
    else if (itemPicked.result === 'You lost!') {
        handleSound('lost')
        enemyColor.bs += ',rgba(124, 124, 124, 0.162) 0 0 0 30px, rgba(113, 113, 113, 0.200) 0 0 0 70px, rgba(101, 101, 101, 0.100) 0 0 0 110px'
    }

    const animateItemOnLoad = event => {
        anime({
            targets: event.currentTarget,
            scale: [4, 1],
            duration: 100,
            easing: 'easeInOutSine',
        })
    }

    return (
        <div className='ResultComponent'>
            <div className="ResultComponent-container">
                <section className="ResultComponent-itemContainer">
                    <p>You</p>
                    <div onLoad={animateItemOnLoad} id='ResultComponent-player' style={{ backgroundColor: playerColor.bg, boxShadow: playerColor.bs, zIndex: -1 }} className="ResultComponent-outer">

                        <div className="ResultComponent-inner">
                            <img src={`/images/icon-${itemPickedRef.playerPicked}.svg`} alt="scissor-icon" className="ResultComponent-Image" />
                        </div>
                    </div>
                </section>
                <section className="ResultComponent-itemContainer">

                    <p>The House</p>
                    <div onLoad={animateItemOnLoad} id='ResultComponent-enemy' style={{ backgroundColor: enemyColor.bg, boxShadow: enemyColor.bs, zIndex: -1 }} className="ResultComponent-outer">
                        <div className="ResultComponent-inner">
                            <img src={`/images/icon-${itemPickedRef.enemyPicked}.svg`} alt="scissor-icon" className="ResultComponent-Image" />
                        </div>
                    </div>
                </section>
            </div>
            <section className="ResultComponent-resultContainer">
                <p ref={resultRef} className='ResultComponent-result'>{itemPickedRef.result}</p>
                <button className='ResultComponent-playAgain'
                    onMouseEnter={() => {
                        handleSound('click', .2)
                    }}
                    onClick={e => {
                        handleSound('press', .4)
                        props.itemPicked.current = { playerPicked: "", enemyPicked: "", result: "" }
                        props.setState(GameState.Game);
                    }}>Play Again</button>

            </section>
        </div>
    )
}

export default ResultComponent