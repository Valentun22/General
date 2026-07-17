import {FC} from "react";
import {WeatherComponent} from "../../WeatherComponent/WeatherComponent";
import {PhotoGalleryComponent} from "../../PhotoGalleryComponent/PhotoGalleryComponent";

const ArticleThreeComponent: FC = () => {
    return (
        <div>
            <WeatherComponent/>
            <PhotoGalleryComponent/>
        </div>
    )
};

export {ArticleThreeComponent};