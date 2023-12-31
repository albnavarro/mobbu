import { html, staticProps } from '../../../../mobjs';
import { loadTextContent } from '../../../../utils/utils';

export const horizontalScrollerV1 = async () => {
    const { data: data_left } = await loadTextContent({
        source: './asset/svg/footer_shape_left.svg',
    });

    const { data: data_right } = await loadTextContent({
        source: './asset/svg/footer_shape_right.svg',
    });

    return html`<div>
        <horizontal-scroller
            ${staticProps({
                svgLeft: data_left,
                svgRight: data_right,
            })}
        ></horizontal-scroller>
    </div>`;
};
