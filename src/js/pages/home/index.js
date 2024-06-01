import { homePageComponentDef } from '../../component/pages/homepage/definition';
import { html, staticProps, useComponent } from '../../mobjs';
import { loadTextContent } from '../../utils/utils';

useComponent([homePageComponentDef]);

export const home = async () => {
    const { data: svg } = await loadTextContent({
        source: './asset/svg/ms.svg',
    });

    return html`<div class="l-index">
        <home-component ${staticProps({ svg })}></home-component>
    </div>`;
};
