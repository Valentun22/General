import {FC, useEffect, useRef, useState} from "react";
import css from './VideoPlayerComponent.module.css'
import {CgPlayButton, CgPlayPause} from "react-icons/cg";
import {LuVolume2, LuVolumeX} from "react-icons/lu";

interface IProps {
    src: string;
    poster?: string;
    index: number;
    activeIndex: number | null;
    onPlay: (index: number) => void;
    wrapClassName?: string;
}

export const VideoPlayer: FC<IProps> = ({src, poster, index, activeIndex, onPlay, wrapClassName}) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [playing, setPlaying] = useState(false);
    const [muted, setMuted] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [buffering, setBuffering] = useState(false);
    const isActive = activeIndex === index;

    useEffect(() => {
        if (!isActive && videoRef.current) {
            videoRef.current.pause();
            setPlaying(false);
        }
    }, [isActive]);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isActive) {
                videoRef.current.pause();
                setPlaying(false);
                onPlay(-1);
            } else {
                if (videoRef.current.readyState === 0) {
                    setBuffering(true);
                    videoRef.current.load();
                }
                videoRef.current.play().catch(() => {
                    setPlaying(false);
                });
                setPlaying(true)
                onPlay(index);
            }
        }
    };

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !muted;
            setMuted(!muted);
        }
    };

    return (
        <div className={`${css.videoWrap} ${wrapClassName ?? ''}`}>
            <video
                ref={videoRef}
                className={css.video}
                src={src}
                poster={poster}
                playsInline
                preload="none"
                onLoadedData={() => {
                    setLoaded(true);
                    setBuffering(false);
                }}
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
                onEnded={() => {
                    setPlaying(false);
                    onPlay(-1);

                    if (videoRef.current) {
                        videoRef.current.currentTime = 0;
                    }
                }}
            />
            {buffering && !loaded && (
                <div className={css.placeholder} aria-hidden={loaded}>
                    <span className={css.placeholderSpinner}/>
                </div>
            )}
            <div className={css.videoControls}>
                <button className={`${css.videoBtnOne} ${css.videoBtn}`} onClick={togglePlay}>
                    {playing ? <CgPlayPause/> : <CgPlayButton/>}
                </button>
                <button className={css.videoBtn} onClick={toggleMute}>
                    {muted ? <LuVolumeX/> : <LuVolume2/>}
                </button>
            </div>
        </div>
    );
};