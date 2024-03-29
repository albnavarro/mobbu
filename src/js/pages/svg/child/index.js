import { html, staticProps } from '../../../mobjs';
import { loadTextContent } from '../../../utils/utils';

export const child = async () => {
    const { data: svg } = await loadTextContent({
        source: './asset/svg/child.svg',
    });

    const { data: star } = await loadTextContent({
        source: './asset/svg/star.svg',
    });

    return html`<div>
        <svg-child ${staticProps({ svg, star })}></svg-child>
    </div>`;
};
