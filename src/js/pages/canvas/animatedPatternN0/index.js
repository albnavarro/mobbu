import { html, staticProps } from '../../../mobjs';
import { animatedPatternN0Params } from './animatedPatternN0Params';

export const animatedPatternN0 = ({ params }) => {
    const { version } = params;

    const props =
        animatedPatternN0Params[
            Math.min(Number(version), animatedPatternN0Params.length)
        ];

    return html`<div class="l-padding">
        <animation-title
            ${staticProps({ title: props.title })}
        ></animation-title>
        <animatedpattern-n0
            ${staticProps({ ...props.animation })}
        ></animatedpattern-n0>
        <quick-nav ${staticProps({ ...props.nav })}></quick-nav>
    </div>`;
};
