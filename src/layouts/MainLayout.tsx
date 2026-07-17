import {useRef} from "react";
import {Outlet, useLocation} from "react-router-dom";
import {Preloader} from "../components/PreloaderComponent/Preloader";
import {useImagesLoaded} from "../hooks/useImagesLoaded";

const MainLayout = () => {
    const location = useLocation();
    const contentRef = useRef<HTMLDivElement>(null);
    const loaded = useImagesLoaded(contentRef, [location.pathname]);

    return (
        <div>
            <Preloader visible={!loaded}/>
            <div ref={contentRef} style={{opacity: loaded ? 1 : 0, transition: "opacity 0.4s ease"}}>
                <Outlet/>
            </div>
        </div>
    );
};

export {MainLayout};
