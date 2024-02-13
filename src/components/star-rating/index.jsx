import { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import './style.css';

export default function StarRating({noOfStars = 5}) {

    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    function handleClick(getCurrentIndex) {
        // console.log(getCurrentIndex);
        setRating(getCurrentIndex);
    }

    function handleMouseEnter(getCurrentIndex) {
        // console.log(getCurrentIndex);
        setHover(getCurrentIndex);
    }

    function handleMouseLeave() {
        // console.log(getCurrentIndex);
        setHover(rating);
    }


    return (
        <div className="star-rating">
            {
                [...Array(noOfStars)].map((_, index) => {

                    index += 1;

                    return <FaStar 
                    key={index}
                    className={index <= (hover || rating) ? 'star active' : 'star inactive'}
                    onClick={() => handleClick(index)}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                    sixe={40}
                    />;
                })
            }
        </div>
    );
}