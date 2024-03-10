export default function Suggestions({ data, handleClick }) {


    return (
        <ul>
            {
                data && data.length ? 
                data.map((item, i) =>
                <li 
                key={i}
                onClick={handleClick}>
                    {item}
                </li>)
                : null
            }
        </ul>
    );
}