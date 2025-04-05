import { DynamicList } from '../../component/pages/dynamicList/definition';
import { html, MobJs } from '../../mob/mobjs';

MobJs.useComponent([DynamicList]);

export const dynamic_list = () => {
    return html` <dynamic-list> </dynamic-list> `;
};
