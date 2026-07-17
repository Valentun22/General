import {
    ArticleOneComponent
} from "../components/HomeComponent/ArticleOneComponent/ArticleOneComponent";
import {
    ArticleTwoComponent
} from "../components/HomeComponent/ArticleTwoComponent/ArticleTwoComponent";
import {
    ArticleThreeComponent
} from "../components/HomeComponent/ArticleThreeComponent/ArticleThreeComponent";
import {
    ArticleFourComponent
} from "../components/HomeComponent/ArticleFourComponent/ArticleFourComponent";
import {FC} from "react";
import {useScrollAnchor} from "../hooks/useScrollAnchor";

const HomePage: FC = () => {
    useScrollAnchor();

    return (
        <>
            <ArticleOneComponent/>
            <ArticleTwoComponent/>
            <ArticleThreeComponent/>
            <ArticleFourComponent/>
        </>
    );
};

export {HomePage};