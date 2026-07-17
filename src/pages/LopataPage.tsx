import {Outlet} from "react-router-dom";
import {LopataComponent} from "../components/LocationComponent/LopataComponent";
import heroBg from "../img/locations/lopata/lopataHome.jpg";
import panoramBg from "../img/locations/lopata/lopataPanoram.jpg";
import {useScrollAnchor} from "../hooks/useScrollAnchor";
import {FC} from "react";

const LopataPage: FC = () => {
    useScrollAnchor();
    return (
        <div>
            <LopataComponent
                backPhotoLocation={heroBg}
                backPhotoPanorama={panoramBg}
            />
            <Outlet/>
        </div>
    );
};

export {LopataPage};