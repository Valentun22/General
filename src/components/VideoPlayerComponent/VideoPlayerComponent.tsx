import {FC, useEffect, useRef, useState} from "react";
import css from './VideoPlayerComponent.module.css'
import {CgPlayButton, CgPlayPause} from "react-icons/cg";
import {LuVolume2, LuVolumeX} from "react-icons/lu";
import logo from "../../img/logo.png";

interface IProps {
    src: string;
    index: number;
    activeIndex: number | null;
    onPlay: (index: number) => void;
    wrapClassName?: string;
}

export const VideoPlayer: FC<IProps> = ({src, index, activeIndex, onPlay, wrapClassName}) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [playing, setPlaying] = useState(false);
    const [muted, setMuted] = useState(false);
    const [loaded, setLoaded] = useState(false);
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
                videoRef.current.play();
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
                playsInline
                preload="metadata"
                onLoadedData={() => setLoaded(true)}
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
            <div className={`${css.placeholder} ${loaded ? css.placeholderHidden : ""}`} aria-hidden={loaded}>
                <img src={logo} alt="" className={css.placeholderLogo}/>
            </div>
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