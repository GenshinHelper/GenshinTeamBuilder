import img_Blank from '../char_img/Blank_Icon.png';
import './CharacterPortrait.css';

export const Size = {
    small: {
        width: 80,
        height: 80,
    },
    med: {
        width: 128,
        height: 128,
    },
    full: {
        width: 256,
        height: 256,
    }
}

export function CharacterPortrait(props) {
    var char = props.char;

    if (!char) {
        char = {
            img: img_Blank,
            displayName: "None",
        };
    }

    return (
        <img className="character-portrait"
            src={char.img}
            alt={char.displayName}
            width={Size.small.width}
            height={Size.small.height}
        />
    );
}