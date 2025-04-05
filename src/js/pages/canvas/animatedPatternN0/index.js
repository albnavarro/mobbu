import { updateQuickNavState } from '../../../component/common/quickNav/utils';
import { AnimatedPatternN0 } from '../../../component/pages/animatedPattern/animatedPatternN0/definition';
import { html, MobJs } from '../../../mob/mobjs';
import { animatedPatternN0Params } from './animatedPatternN0Params';

MobJs.useComponent([AnimatedPatternN0]);

/** @type{import('../../../mob/mobjs/type').Page} */
export const animatedPatternN0 = ({ params }) => {
    const { version } = params;

    const props =
        animatedPatternN0Params[
            Math.max(
                0,
                Math.min(Number(version), animatedPatternN0Params.length - 1)
            )
        ];

    /** Quicknav */
    updateQuickNavState({
        active: true,
        prevRoute: props.nav.prevRoute,
        nextRoute: props.nav.nextRoute,
        backRoute: props.nav.backRoute,
        color: 'black',
    });

    return html`<div class="l-padding">
        <animatedpattern-n0
            ${MobJs.staticProps({
                ...props.animation,
            })}
        ></animatedpattern-n0>
    </div>`;
};
