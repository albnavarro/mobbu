import { html, staticProps } from '../../../mobjs';
import { loadTextContent } from '../../../utils/utils';

export const m3 = async () => {
    const { data: svg } = await loadTextContent({
        source: './asset/svg/m3.svg',
    });

    return html`<div>
        <animation-title ${staticProps({ title: 'M3' })}></animation-title>
        <lettering-m3 ${staticProps({ svg })}></lettering-m3>
        <quick-nav
            ${staticProps({
                prevRoute: '#child',
                nextRoute: '',
            })}
        ></quick-nav>
    </div>`;
};
