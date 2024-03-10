import GithubFinder from './../components/github-finder/index.jsx';
import ColorGenerator from './../components/color-generator/index.jsx';
import Accordion from './../components/accordion/index.jsx';
import QrCodeGenerator from './../components/qr-code-generator/index.jsx';

export default function Discover() {

    return (
        <div className="page discover">
            <GithubFinder />
            <ColorGenerator />
            <Accordion />
            <QrCodeGenerator />
        </div>
    );
}