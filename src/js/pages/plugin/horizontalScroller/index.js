import { HorizontalScroller } from '../../../component/pages/horizontalScroller/definition';
import { html, staticProps, useComponent } from '../../../mobjs';
import { loadTextContent } from '../../../utils/utils';
import { horizontalScrollerParams } from './horizontalScrollerParams';

useComponent([HorizontalScroller]);

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
        <horizontal-scroller
            ${staticProps({
                animatePin: props.animatePin,
                svgLeft: data_left,
                svgRight: data_right,
                prevRoute: props.nav.prevRoute,
                nextRoute: props.nav.nextRoute,
            })}
        ></horizontal-scroller>
    </div>`;
};
