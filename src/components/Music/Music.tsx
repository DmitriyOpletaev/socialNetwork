import React, {useState} from 'react';

import Picker, {SKIN_TONE_MEDIUM_DARK} from 'emoji-picker-react';


const Music = () => {
    const [chosenEmoji, setChosenEmoji] = useState('');


    // @ts-ignore
    const onEmojiClick = (event, emojiObject) => {
        setChosenEmoji(emojiObject);
    }



    return (
        <>
            <h1 style={{textAlign: 'center'}}>Demo emoji picker</h1>
            <div style={{textAlign: 'center', marginLeft: '810px'}}>
                <Picker onEmojiClick={onEmojiClick} skinTone={SKIN_TONE_MEDIUM_DARK}/>
                {chosenEmoji && <EmojiData chosenEmoji={chosenEmoji}/>}
            </div>
            <div><input value={chosenEmoji}/></div>
        </>
    );
};

// @ts-ignore
const EmojiData = ({chosenEmoji}) => (
    <div style={{textAlign: 'center', marginRight: '810px'}}>
        <br></br>
        <br></br>
        <hr></hr>
        <strong>Names:</strong> {chosenEmoji.names.join(', ')}<br/>
        <strong>Symbol:</strong> {chosenEmoji.emoji}<br/>

    </div>
);



export default Music

