import { html, MobJs } from '@mobJs';
import { DynamicList } from '@pagesComponent/dynamic-list/definition';

MobJs.useComponent([DynamicList]);

export const dynamic_list = () => {
    return html` <dynamic-list> </dynamic-list> `;
};
