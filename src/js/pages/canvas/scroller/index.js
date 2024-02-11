import { html, staticProps } from '../../../mobjs';
import { scrollerParams } from './scrollerParams';

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
                title: props.title,
            })}
        ></scroller-n0>
    </div>`;
};
