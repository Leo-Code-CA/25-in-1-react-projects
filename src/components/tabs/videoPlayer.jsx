import './twitchEmbed.js';
import './youtubeEmbed.js';
import { useEffect, useRef } from 'react';

export default function VideoPlayer({ id, options, type }) {

    console.log(id, options, type);

    const videoRef = useRef(null);

    useEffect(() => {

        const videoElem = videoRef.current;

        async function handleEmbedVideo() {

            type === 'twitch' ? await new Twitch.Embed(id, options)
            : await new YT.Player(id, options);

        }

        handleEmbedVideo();

        return () => videoElem.innerHTML = '';

    }, [id, options, type]);

    return (
        <div ref={videoRef} id={id}></div>
    );

}