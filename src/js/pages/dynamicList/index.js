import { DynamicList } from '../../component/pages/dynamicList/definition';
import { html, useComponent } from '../../mobjs';

useComponent([DynamicList]);

export const dynamic_list = () => {
    return html` <dynamic-list> </dynamic-list> `;
};
