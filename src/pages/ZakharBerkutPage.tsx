import {Outlet} from "react-router-dom";
import {ZakharBerkutComponent} from "../components/LocationComponent/ZakharBerkutComponent";
import heroBg from "../img/locations/zakhar_berkut/zaharHome.jpg";
import panoramBg from "../img/locations/zakhar_berkut/zaharPanoram.jpg";
import {FC} from "react";
import {useScrollAnchor} from "../hooks/useScrollAnchor";

const ZakharBerkutPage:FC = () => {
    useScrollAnchor();

    return (
        <div>
            <ZakharBerkutComponent
                backPhotoLocation={heroBg}
                backPhotoPanorama={panoramBg}
            />
            <Outlet/>
        </div>
    );
};

export {ZakharBerkutPage};