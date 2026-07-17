import {IFaqItemInterface} from "../interfaces/IFaqInterface";

export const getFaqs = (t: any, category: 'house' | 'territory' | 'kitchen' | 'bathroom'): IFaqItemInterface[] =>
    t(`faq.${category}`, {returnObjects: true}) as IFaqItemInterface[];

export const houseFaqs: IFaqItemInterface[] = [];
export const territoryFaqs: IFaqItemInterface[] = [];
export const kitchenFaqs: IFaqItemInterface[] = [];
export const bathroomFaqs: IFaqItemInterface[] = [];
