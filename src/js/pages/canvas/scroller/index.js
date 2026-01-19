import { updateQuickNavState } from '@commonComponent/quick-nav/utils';
import { html, MobJs } from '@mobJs';
import { ScrollerN0 } from '@pagesComponent/scroller/n0/definition';
import { loadTextContent } from '@utils/utils';

MobJs.useComponent([ScrollerN0]);

/** @type {import('@mobJsType').Page} */
export const scrollerN0 = async () => {
    const { data: bg } = await loadTextContent({
        source: './asset/svg/lettering-mob.svg?v=1.3',
    });

    /** Quicknav */
    updateQuickNavState({
        active: true,
        prevRoute: '#animatedPatternN1',
        nextRoute: '#scrollerN1',
        backRoute: '#canvas-overview',
    });

    return html`<div>
        <scroller-n0
            ${MobJs.staticProps(
                /** @type {import('@pagesComponent/animated-pattern/n0/type').AnimatedPatternN0['props']} */
                ({
                    background: bg,
                })
            )}
        ></scroller-n0>
    </div>`;
};
