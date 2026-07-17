import {IRuleSectionInterface} from "../interfaces/IRuleSectionInterface";

export const getRestRules = (t: any): IRuleSectionInterface[] =>
    t('rules.sections', {returnObjects: true}) as IRuleSectionInterface[];

export const restRules: IRuleSectionInterface[] = [];
