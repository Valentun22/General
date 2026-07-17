import {Outlet} from "react-router-dom";
import {KamyankaComponent} from "../components/LocationComponent/KamyankaComponent";
import heroBg from "../img/locations/kamyanka/kamyankaHome.jpg";
import panoramBg from "../img/locations/kamyanka/kamyankaPanoram.jpg";
import {useScrollAnchor} from "../hooks/useScrollAnchor";
import {FC} from "react";

const KamyankaPage: FC = () => {
    useScrollAnchor();

    return (
        <div>
            <KamyankaComponent
                backPhotoLocation={heroBg}
                backPhotoPanorama={panoramBg}
            />
            <Outlet/>
        </div>
    );
};

export {KamyankaPage};