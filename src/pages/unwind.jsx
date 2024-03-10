import ImageSlider from './../components/image-slider/index.jsx';
import TicTacToe from './../components/tic-tac-toe/index.jsx';
import Tabs from './../components/tabs/index.jsx';
import LoadMore from './../components/load-more/index.jsx';

export default function Unwind() {

    return (
        <div className="page unwind">
            <ImageSlider />
            <TicTacToe />
            <Tabs />
            <LoadMore />
        </div>
    );
}