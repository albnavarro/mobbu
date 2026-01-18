import { updateQuickNavState } from '@commonComponent/quick-nav/utils';
import { html, MobJs } from '@mobJs';
import { AnimatedPatternN0 } from '@pagesComponent/animated-pattern/n0/definition';
import { animatedPatternN0Params } from './animated-pattern-n0-params';
import { loadTextContent } from '@utils/utils';

MobJs.useComponent([AnimatedPatternN0]);

/** @type {import('@mobJsType').Page} */
export const animatedPatternN0 = async ({ params }) => {
    const { version } = params;

    const { data: bg } = await loadTextContent({
        source: './asset/svg/lettering-mob.svg?v=1.3',
    });

    const props =
        animatedPatternN0Params[
            Math.max(
                0,
                Math.min(Number(version), animatedPatternN0Params.length - 1)
            )
        ];

    if (!props) return '';

    /** Quicknav */
    updateQuickNavState({
        active: true,
        prevRoute: props.nav.prevRoute,
        nextRoute: props.nav.nextRoute,
        backRoute: props.nav.backRoute,
    });

    return html`<div class="l-padding">
        <animatedpattern-n0
            ${MobJs.staticProps(
                /** @type {import('@pagesComponent/animated-pattern/n0/type').AnimatedPatternN0['props']} */
                ({
                    ...props.animation,
                    background: bg,
                })
            )}
        ></animatedpattern-n0>
    </div>`;
};
