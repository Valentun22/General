import React from "react";

export interface IFaqItemInterface {
    question: string;
    answer: string;
}

export interface IFaqCategoryInterface {
    icon: React.ReactElement;
    title: string;
    items: IFaqItemInterface[];
}

