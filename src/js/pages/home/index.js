import { html, staticProps } from '../../mobjs';
import { loadTextContent } from '../../utils/utils';

export const home = async () => {
    const { data: svg } = await loadTextContent({
        source: './asset/svg/ms.svg',
    });

    return html`<div class="l-index">
        <home-component ${staticProps({ svg })}></home-component>
    </div>`;
};
