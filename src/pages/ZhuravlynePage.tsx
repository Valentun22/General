import {Outlet} from "react-router-dom";
import {ZhuravlyneComponent} from "../components/LocationComponent/ZhuravlyneComponent";
import heroBg from "../img/locations/zhuravlyne/zhuravlyneHome.jpg";
import panoramBg from "../img/locations/zhuravlyne/zhuravlynePanoram.jpg";
import {useScrollAnchor} from "../hooks/useScrollAnchor";
import {FC} from "react";

const ZhuravlynePage:FC = () => {
    useScrollAnchor();

    return (
        <div>
            <ZhuravlyneComponent
                backPhotoLocation={heroBg}
                backPhotoPanorama={panoramBg}
            />
            <Outlet/>
        </div>
    );
};

export {ZhuravlynePage};