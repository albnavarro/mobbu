import { HorizontalScroller } from '../../../component/pages/horizontalScroller/definition';
import { html, staticProps, useComponent } from '../../../mobjs';
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

    return html`<div>
        <horizontal-scroller
            ${staticProps({
                animatePin: props.animatePin,
                prevRoute: props.nav.prevRoute,
                nextRoute: props.nav.nextRoute,
            })}
        ></horizontal-scroller>
    </div>`;
};
