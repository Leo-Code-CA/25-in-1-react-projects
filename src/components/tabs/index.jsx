import { useState } from "react";
import Tab from "./tab.jsx";
import './style.css';

export default function Tabs() {

    const [currentTabIndex, setCurrentTabIndex] = useState(0);

    const tabsContent = [
        {
            name: 'funny',
            description: "Let's have some fun with fail army!",
            key: 'funny_110923239',
            video_player: {
                id: 'twitch-embed',
                options: {
                    width: '100%',
                    height: '100%',
                    channel: "failarmy",
                    theme: 'light',
                    layout: 'video'
                },
                type: "twitch"
            }
        },
        {
            name: 'lovely',
            description: "Some pure cuteness",
            key: 'lovely_344920121',
            video_player: {
                id: 'twitch-embed',
                options: {
                    width: '100%',
                    height: '100%',
                    channel: "turtlesandchill",
                    theme: 'light',
                    layout: 'video'
                },
                type: "twitch"
            }
        },
        {
            name: 'soothing',
            description: "Relax and throwback a few years",
            key: 'soothing_9383819214',
            video_player: {
                id: 'youtube-embed',
                options: {
                    height: '100%',
                    width: '100%',
                    videoId: '3vLHelBuTRM'
                },
                type: 'youtube'
            },
        },
        {
            name: 'fascinating',
            description: "Wonderful",
            key: 'fascinating_4528191101',
            video_player: {
                id: 'youtube-embed',
                options: {
                    height: '100%',
                    width: '100%',
                    videoId: '0FBiyFpV__g'
                },
                type: 'youtube'
            }
        }
    ];

    return (
        <div className="tabs">
            <h2>Tabs - What do you feel like?</h2>
            <div className="tabs__heading">
            {
                tabsContent.map((tab, i) => 
                <button
                key={tab.key}
                onClick={() => setCurrentTabIndex(i)}
                >
                    {tab.name}
                </button>)
            }
            </div>
            <div className="tabs__content">
                <Tab tabContent={tabsContent[currentTabIndex]}/>
            </div>
        </div>
    );
}