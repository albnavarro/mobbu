import { svgChild } from '../../../component/pages/svg/child/definition';
import { html, staticProps, useComponent } from '../../../mobjs';
import { loadTextContent } from '../../../utils/utils';

useComponent([svgChild]);

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
