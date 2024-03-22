import VideoPlayer from "./videoPlayer";

export default function Tab({ tabContent }) {

    return (
        <div className={tabContent.name}>
            <p>{tabContent.description}</p>
            <VideoPlayer 
            id={tabContent?.video_player?.id} 
            options={tabContent?.video_player?.options} 
            type={tabContent?.video_player?.type}/>
        </div>
    );
}