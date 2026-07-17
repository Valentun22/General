import {Outlet} from "react-router-dom";
import heroBg from "../img/locations/pavliv_potik/pavlivHome.jpg";
import panoramBg from "../img/locations/pavliv_potik/pavlivPanoram.jpg";
import {useScrollAnchor} from "../hooks/useScrollAnchor";
import {FC} from "react";
import {PavlivPotikComponent} from "../components/LocationComponent/PavlivPotikComponent";

const PavlivPotikPage: FC = () => {
    useScrollAnchor();

    return (
        <div>
            <PavlivPotikComponent
                backPhotoLocation={heroBg}
                backPhotoPanorama={panoramBg}
            />
            <Outlet/>
        </div>
    );
};

export {PavlivPotikPage};