import { fromObject, MobJs } from '@mobJs';
import { DynamicList } from '@pagesComponent/dynamic-list/definition';

MobJs.useComponent([DynamicList]);

export const dynamic_list = () => {
    return fromObject({
        component: DynamicList,
    });
};
