import { html, staticProps } from '../../../mobjs';
import { loadTextContent } from '../../../utils/utils';

export const mv1 = async () => {
    const { data: svg } = await loadTextContent({
        source: './asset/svg/m3.svg',
    });

    return html`<div class="l-index">
        <mv1-component ${staticProps({ svg })}></mv1-component>
        <quick-nav
            ${staticProps({
                prevRoute: '#child',
                nextRoute: '',
            })}
        ></quick-nav>
    </div>`;
};
