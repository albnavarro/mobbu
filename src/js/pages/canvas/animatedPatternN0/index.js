import { updateQuickNavState } from '@commonComponent/quickNav/utils';
import { html, MobJs } from '@mobJs';
import { AnimatedPatternN0 } from '@pagesComponent/animatedPattern/animatedPatternN0/definition';
import { animatedPatternN0Params } from './animatedPatternN0Params';

MobJs.useComponent([AnimatedPatternN0]);

/** @type{import('@mobJsType').Page} */
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
