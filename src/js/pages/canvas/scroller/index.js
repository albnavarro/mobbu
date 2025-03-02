import { ScrollerN0 } from '../../../component/pages/scroller/ScrollerN0/definition';
import { html, staticProps, useComponent } from '../../../mobjs';
import { scrollerParams } from './scrollerParams';

useComponent([ScrollerN0]);

/** @type{import('../../../mobjs/type').Page} */
export const scrollerN0 = ({ params }) => {
    const { version } = params;

    const props =
        scrollerParams[
            Math.max(0, Math.min(Number(version), scrollerParams.length - 1))
        ];

    return html`<div>
        <scroller-n0
            ${staticProps({
                ...props.animation,
                prevRoute: props.nav.prevRoute,
                nextRoute: props.nav.nextRoute,
                backRoute: props.nav.backRoute,
            })}
        ></scroller-n0>
    </div>`;
};
