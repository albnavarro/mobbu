import { updateQuickNavState } from '@commonComponent/quick-nav/utils';
import { html, MobJs } from '@mobJs';
import { AnimatedPatternN0 } from '@pagesComponent/animated-pattern/n0/definition';
import { loadTextContent } from '@utils/utils';

MobJs.useComponent([AnimatedPatternN0]);

/** @type {import('@mobJsType').Page} */
export const animatedPatternN0 = async () => {
    const { data: bg } = await loadTextContent({
        source: './asset/svg/lettering-mob.svg?v=1.3',
    });

    /** Quicknav */
    updateQuickNavState({
        active: true,
        prevRoute: '#async-timeline',
        nextRoute: '#animatedPatternN1',
        backRoute: '#canvas-overview',
    });

    return html`<div class="l-padding">
        <animatedpattern-n0
            ${MobJs.staticProps(
                /** @type {import('@pagesComponent/animated-pattern/n0/type').AnimatedPatternN0['props']} */
                ({
                    background: bg,
                })
            )}
        ></animatedpattern-n0>
    </div>`;
};
