import LightDarkMode from '../light-dark-mode/index.jsx';
import TicTacToe from '../tic-tac-toe/index.jsx';
import RandomColorGenerator from '../random-color/index.jsx';
import Accordion from '../accordion/index.jsx';
import TreeView from '../tree-view/index.jsx';
import { FeatureFlagsContext } from './context/index.jsx';
import { useContext } from 'react';
import { menus } from '../tree-view/data.js';

export default function FeatureFlags() {

    const { loading, enabledFlags } = useContext(FeatureFlagsContext);

    const componentsToRender = [
        {
            key: 'showLightAndDarkMode',
            component: <LightDarkMode />
        },
        {
            key: 'showTicTacToeBoard',
            component: <TicTacToe />
        },
        {
            key: 'showRandomColorGenerator',
            component: <RandomColorGenerator />
        },
        {
            key: 'showAccordion',
            component: <Accordion />
        },
        {
            key: 'showtreeView',
            component: <TreeView menus={menus}/>
        }
    ];

    function checkEnabledFlags(getCurrentKey) {
        return enabledFlags[getCurrentKey];
    }

    if (loading) return <h1>Loading in progress, please wait...</h1>;

    return (
        <div>
            <h1>Feature Flags</h1>
            {
                componentsToRender.map(item => checkEnabledFlags(item.key) ? item.component : null)
            }
        </div>
    );
}