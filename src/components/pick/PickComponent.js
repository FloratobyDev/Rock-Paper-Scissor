import anime from 'animejs';
import React from 'react'
import { GameState } from '../../types/Statetype'
import './pickStyle.scss'

const PickComponent = (props) => {

    function playAudio(audio) {
        // setTimeout(() => resolve("I am a done promise!"), 3000)
        let promise = new Promise((resolve, reject) => {
            setTimeout(() => resolve("I am a done promise!"), 1000)
        });
        return promise
        // return new Promise(res => {
        //     audio.volume = .5
        //     audio.play()
        //     audio.onended = res
        // })
    }

    // how to call
    //   async function test(){
    //     const audio = new Audio('<url>')
    //     await playAudio(audio)
    //     // code that will run after audio finishes...
    //   }
    const handleSound = (audioName) => {
        const clickSound = new Audio(`/${audioName}.wav`)
        clickSound.volume = .5
        clickSound.play()
    }

    function handlePick(event) {
        handleSound('press')
        props.setItemPicked(event.currentTarget.getAttribute('name'), 'player')
        props.setState(GameState.Judging)
    }

    const handleClickSound = () => {
        handleSound('click')
    }

    return (
        <div className='PickComponent'>
            <div className="PickComponent-pickContainer">
                <img className='PickComponent-triangle' src="/images/bg-triangle.svg" alt="outline-triangle" />

                <div onMouseEnter={handleClickSound} onClick={handlePick} name='paper' className="PickComponent-win PickComponent-paper-outer PickComponent-u-itemClicked">
                    <div className="PickComponent-paper-inner">
                        <img src="/images/icon-paper.svg" alt="hand-icon" className="PickComponent-Image" />
                    </div>
                </div>
                <div onMouseEnter={handleClickSound} onClick={handlePick} name='scissor' className="PickComponent-scissor-outer PickComponent-u-itemClicked">
                    <div className="PickComponent-scissor-inner">
                        <img src="/images/icon-scissor.svg" alt="scissor-icon" className="PickComponent-Image" />
                    </div>
                </div>
                <div onMouseEnter={handleClickSound} onClick={handlePick} name='rock' className="PickComponent-rock-outer PickComponent-u-itemClicked">
                    <div className="PickComponent-rock-inner">
                        <img src="/images/icon-rock.svg" alt="rock-icon" className="PickComponent-Image" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PickComponent