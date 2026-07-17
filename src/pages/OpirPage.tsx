import {Outlet} from "react-router-dom";
import {OpirComponent} from "../components/LocationComponent/OpirComponent";
import heroBg from "../img/locations/opir/opirHome.jpg";
import panoramBg from "../img/locations/opir/opirPanoram.jpg";
import {useScrollAnchor} from "../hooks/useScrollAnchor";
import {FC} from "react";

const OpirPage: FC = () => {
    useScrollAnchor();

    return (
        <div>
            <OpirComponent
                backPhotoLocation={heroBg}
                backPhotoPanorama={panoramBg}
            />
            <Outlet/>
        </div>
    );
};

export {OpirPage};