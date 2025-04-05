import { svgChild } from '../../../component/pages/svg/child/definition';
import { html, MobJs } from '../../../mob/mobjs';
import { loadTextContent } from '../../../utils/utils';

MobJs.useComponent([svgChild]);

export const child = async () => {
    const { data: svg } = await loadTextContent({
        source: './asset/svg/child.svg',
    });

    const { data: star } = await loadTextContent({
        source: './asset/svg/star.svg',
    });

    return html`<div>
        <svg-child ${MobJs.staticProps({ svg, star })}></svg-child>
    </div>`;
};
