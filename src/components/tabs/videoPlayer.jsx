import './twitchEmbed.js';
import './youtubeEmbed.js';
import { useEffect, useRef } from 'react';

export default function VideoPlayer({ id, options, type }) {

    const twitchRef = useRef(null);

    useEffect(() => {

        if (type === 'youtube') {
            const ytPlayer = new YT.Player(id, options);
            return () => ytPlayer.destroy();
        } else {
            new Twitch.Embed(id, options);
            return () => twitchRef ? twitchRef.current.innerHTML = '' : null;
        }

    }, [id, options, type]);

    return (
        <div id={id} ref={twitchRef}></div>
    );


}