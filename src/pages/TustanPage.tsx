import {Outlet} from "react-router-dom";
import {TustanComponent} from "../components/LocationComponent/TustanComponent";
import heroBg from "../img/locations/tustan/tustanHome.jpg";
import panoramBg from "../img/locations/tustan/tustanPanoram.jpg";
import {FC} from "react";
import {useScrollAnchor} from "../hooks/useScrollAnchor";

const TustanPage:FC = () => {
    useScrollAnchor();

    return (
        <div>
            <TustanComponent
                backPhotoLocation={heroBg}
                backPhotoPanorama={panoramBg}
            />
            <Outlet/>
        </div>
    );
};

export {TustanPage};