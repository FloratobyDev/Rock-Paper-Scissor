import React, { useRef } from 'react'
import './ruleStyle.scss'

const RuleComponent = () => {

    const toggleRef = useRef(false)
    const overlayRef = useRef(null)

    const toggleOverlay = event => {
        toggleRef.current = !toggleRef.current
        if (toggleRef.current) {
            overlayRef.current.style.display = 'flex'
            overlayRef.current.parentElement.style.zIndex = 9999
        }
        else {
            overlayRef.current.style.display = 'none'
            overlayRef.current.parentElement.style.zIndex = 0
        }
        console.log('Overlay status :' + overlayRef.current.style.display)
    }

    return (
        <div className='RuleComponent'>
            <div ref={overlayRef} className="RuleComponent-overlay">
                <div className="RuleComponent-ruleContainer">
                    <div className="RuleComponent-nameCloseContainer">
                        <p className="RuleComponent-ruleName">RULES</p>
                        <img onClick={toggleOverlay} className='RuleComponent-close' src="/images/icon-close.svg" alt="icon-close" />
                    </div>
                    <img src="/images/image-rules.svg" alt="" className="RuleComponent-ruleImage" />
                    <img onClick={toggleOverlay} className='RuleComponent-mobileClose' src="/images/icon-close.svg" alt="icon-close" />
                </div>
            </div>
            <button onClick={toggleOverlay} className="RuleComponent-overlayButton" alt='overlay-button'>RULES</button>
        </div>
    )
}

export default RuleComponent