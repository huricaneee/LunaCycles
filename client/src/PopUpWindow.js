import * as React from 'react';
import './PopUpWindow.css';
import {useContext, useState} from 'react';

function PopUpWindow({isPopUp, setPopUp}) {

    const emojis = ['😊','😀'];
    const emojiList = emojis.map((emoji) => <button className='emoji-button'>{emoji}</button>);

    const handleClose = () => {
        setPopUp(0);
    }

    if (isPopUp) {
        return (
            <div className='popup-overlay'>
                <div className='popup-content'>
                    
                    <button className='close' onClick={handleClose}>X</button>
                    <h2>Welcome, Please select your mood!</h2>
                    <div>
                        {emojiList}
                    </div>
                </div>
            </div>
        );
    }
    return null;
};

export default PopUpWindow;