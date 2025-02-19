import { AnimatedPatternN0 } from '../../../component/pages/animatedPattern/animatedPatternN0/definition';
import { html, staticProps, useComponent } from '../../../mobjs';
import { animatedPatternN0Params } from './animatedPatternN0Params';

useComponent([AnimatedPatternN0]);

/** @type{import('../../../mobjs/type').Page} */
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
        <animatedpattern-n0
            ${staticProps({
                ...props.animation,
                prevRoute: props.nav.prevRoute,
                nextRoute: props.nav.nextRoute,
            })}
        ></animatedpattern-n0>
    </div>`;
};
