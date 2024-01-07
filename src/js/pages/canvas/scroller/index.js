import { html, staticProps } from '../../../mobjs';
import { scrollerParams } from './scrollerParams';

export const scrollerN0 = ({ params }) => {
    const { version } = params;

    const props =
        scrollerParams[Math.min(Number(version), scrollerParams.length)];

    return html`<div>
        <animation-title
            ${staticProps({ title: props.title })}
        ></animation-title>
        <scroller-n0 ${staticProps({ ...props.animation })}></scroller-n0>
        <quick-nav ${staticProps({ ...props.nav })}></quick-nav>
    </div>`;
};
