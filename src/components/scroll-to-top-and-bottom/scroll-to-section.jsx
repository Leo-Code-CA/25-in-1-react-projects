import { useRef } from "react";


export default function ScrollToSection() {

    const ref = useRef();

    const data = [
        {
            label: 'first card',
            style: {
                width: '100%',
                height: '600px',
                backgroundColor: 'lavender'
            }
        },
        {
            label: 'second card',
            style: {
                width: '100%',
                height: '600px',
                backgroundColor: 'pink'
            }
        },
        {
            label: 'third card',
            style: {
                width: '100%',
                height: '600px',
                backgroundColor: 'lavenderblush'
            }
        },
        {
            label: 'fourth card',
            style: {
                width: '100%',
                height: '600px',
                backgroundColor: 'palevioletred'
            }
        },
        {
            label: 'fifth card',
            style: {
                width: '100%',
                height: '600px',
                backgroundColor: 'purple'
            }
        },
    ];

    function handleScrollToSection() {

        ref.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest'
        });

    }


    return (
        <div>
            <h1>Scroll to a particular section</h1>
            <button onClick={handleScrollToSection}>Click To Scroll</button>
            {
                data.map((item, i) => 
                <div
                ref={i === 3 ? ref : null}
                style={item.style}
                key={i}>
                    <h3>{item.label}</h3>
                </div>)
            }
        </div>
    );
}