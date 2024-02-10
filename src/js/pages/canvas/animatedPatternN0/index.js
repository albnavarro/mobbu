import { html, staticProps } from '../../../mobjs';
import { animatedPatternN0Params } from './animatedPatternN0Params';

export const animatedPatternN0 = ({ params }) => {
    const { version } = params;

    const props =
        animatedPatternN0Params[
            Math.max(
                0,
                Math.min(Number(version), animatedPatternN0Params.length - 1)
            )
        ];

    return html`<div class="l-padding">
        <animation-title
            ${staticProps({ title: props.title })}
        ></animation-title>
        <animatedpattern-n0
            ${staticProps({
                ...props.animation,
                prevRoute: props.nav.prevRoute,
                nextRoute: props.nav.nextRoute,
            })}
        ></animatedpattern-n0>
        <quick-nav></quick-nav>
    </div>`;
};
