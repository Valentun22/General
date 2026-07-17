import {Outlet} from "react-router-dom";
import {ParashkaComponent} from "../components/LocationComponent/ParashkaComponent";
import heroBg from "../img/locations/parashka/parashkaHome.png";
import panoramBg from "../img/locations/parashka/parashkaPanoram.jpg";
import {FC} from "react";
import {useScrollAnchor} from "../hooks/useScrollAnchor";

const ParashkaPage:FC = () => {
    useScrollAnchor();

    return (
        <div>
            <ParashkaComponent
                backPhotoLocation={heroBg}
                backPhotoPanorama={panoramBg}
            />
            <Outlet/>
        </div>
    );
};

export {ParashkaPage};