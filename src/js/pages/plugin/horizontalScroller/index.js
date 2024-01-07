import { html, staticProps } from '../../../mobjs';
import { loadTextContent } from '../../../utils/utils';
import { horizontalScrollerParams } from './horizontalScrollerParams';

export const horizontalScroller = async ({ params }) => {
    const { version } = params;

    const props =
        horizontalScrollerParams[
            Math.max(
                0,
                Math.min(Number(version), horizontalScrollerParams.length - 1)
            )
        ];

    const { data: data_left } = await loadTextContent({
        source: './asset/svg/footer_shape_left.svg',
    });

    const { data: data_right } = await loadTextContent({
        source: './asset/svg/footer_shape_right.svg',
    });

    return html`<div>
        <animation-title
            ${staticProps({
                title: props.title,
                align: 'right',
            })}
        ></animation-title>
        <horizontal-scroller
            ${staticProps({
                animatePin: props.animatePin,
                svgLeft: data_left,
                svgRight: data_right,
            })}
        ></horizontal-scroller>
        <quick-nav ${staticProps({ ...props.nav })}></quick-nav>
    </div>`;
};
