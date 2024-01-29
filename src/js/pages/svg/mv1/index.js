import { html, staticProps } from '../../../mobjs';
import { loadTextContent } from '../../../utils/utils';

export const mv1 = async () => {
    const { data: svg } = await loadTextContent({
        source: './asset/svg/mv1.svg',
    });

    return html`<div class="l-index">
        <animation-title ${staticProps({ title: 'Mv1' })}></animation-title>
        <mv1-component ${staticProps({ svg })}></mv1-component>
        <quick-nav
            ${staticProps({
                prevRoute: '#child',
                nextRoute: '',
            })}
        ></quick-nav>
    </div>`;
};
