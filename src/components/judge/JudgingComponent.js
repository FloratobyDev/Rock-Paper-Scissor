import React, { useEffect, useRef, useState } from 'react'
import anime from 'animejs/lib/anime.es.js';
import { GameState, ItemTypes } from '../../types/Statetype'
import './judgeStyle.scss'
const JudgingComponent = (props) => {

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
    const [loading, setLoading] = useState(true)
    const enemyPickRef = useRef("")

    const itemPickedRef = useRef(props.renderPicked.current);

    const playerColor = useRef(keyColorPairs[itemPickedRef.current.playerPicked])
    const enemyColor = useRef('');

    useEffect(() => {

    }, [])

    useEffect(() => {

        let itemPicked = itemPickedRef

        const resultJudge = () => {
            if ((itemPicked.current.playerPicked === 'rock' && enemyPickRef.current === 'scissor') || (itemPicked.current.playerPicked === 'scissor' && enemyPickRef.current) === 'paper' || (itemPicked.current.playerPicked === 'paper' && enemyPickRef.current === 'rock')) {
                return 'You won!'
            }
            else if (itemPicked.current.playerPicked === enemyPickRef.current) {
                return 'Draw'
            }
            else {
                return 'You lost!'
            }
        }

        const timeout = setTimeout(() => {
            enemyPickRef.current = ItemTypes[Math.round((Math.random() * 2))]
            props.setItemPicked(enemyPickRef.current, 'enemy')
            props.setItemPicked(resultJudge(), 'result')
            setLoading(false)
        }, 800)

        return () => {
            clearTimeout(timeout)
        }
    }, [props])

    enemyColor.current = keyColorPairs[enemyPickRef.current]

    useEffect(() => {
        let checkingResultsTimeout = undefined

        let itemPicked = itemPickedRef

        // result.current = resultJudge()
        if (!loading) {
            checkingResultsTimeout = setTimeout(() => {

                props.setState(GameState.Result)
            }, 1000)
        }

        return () => {
            if (checkingResultsTimeout !== undefined) {
                clearTimeout(checkingResultsTimeout)
            }
        }

    }, [props, loading])

    const animateItemOnLoad = event => {
        const onLoadAudio = new Audio('/error.wav')
        onLoadAudio.volume = .5;
        onLoadAudio.play()

        anime({
            targets: event.currentTarget,
            scale: [4, 1],
            duration: 100,
            easing: 'easeInOutSine',
        })
    }

    return (
        <div className='JudgeComponent'>
            <section className="JudgeComponent-itemContainer">
                <p>You Picked</p>
                <div id='player' style={{ backgroundColor: playerColor.current.bg, boxShadow: playerColor.current.bs }} className="JudgeComponent-outer">

                    <div className="JudgeComponent-inner">
                        <img src={`/images/icon-${itemPickedRef.current.playerPicked}.svg`} alt="scissor-icon" className="JudgeComponent-Image" />
                    </div>
                </div>
            </section>

            <section className="JudgeComponent-itemContainer">
                <p>The House Picked</p>
                {loading ?
                    <div className="JudgeComponent-temporaryCircle"></div> :
                    <>
                        <div onLoad={animateItemOnLoad} id='enemy' style={{ backgroundColor: enemyColor.current.bg, boxShadow: enemyColor.current.bs }} className="JudgeComponent-outer">
                            <div className="JudgeComponent-inner">
                                <img src={`/images/icon-${itemPickedRef.current.enemyPicked}.svg`} alt="scissor-icon" className="JudgeComponent-Image" />
                            </div>
                        </div>
                    </>
                }
            </section>
        </div>
    )
}

export default JudgingComponent