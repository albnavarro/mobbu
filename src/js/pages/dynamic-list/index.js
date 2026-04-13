import { htmlObject } from '@mobJs';
import { DynamicList } from '@pagesComponent/dynamic-list/definition';

export const dynamic_list = () => {
    return htmlObject({
        component: DynamicList,
    });
};
