import { dynamicListDef } from '../../component/pages/dynamicList/definition';
import { html, useComponent } from '../../mobjs';

useComponent([dynamicListDef]);

export const dynamic_list = () => {
    return html` <dynamic-list> </dynamic-list> `;
};
