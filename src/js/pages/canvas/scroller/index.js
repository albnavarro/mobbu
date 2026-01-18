import { updateQuickNavState } from '@commonComponent/quick-nav/utils';
import { html, MobJs } from '@mobJs';
import { ScrollerN0 } from '@pagesComponent/scroller/n0/definition';
import { scrollerParams } from './scroller-params';
import { updateAnimationDescription } from '@commonComponent/animation-description/utils';
import { loadTextContent } from '@utils/utils';

MobJs.useComponent([ScrollerN0]);

/** @type {import('@mobJsType').Page} */
export const scrollerN0 = async ({ params }) => {
    const { version } = params;

    const { data: bg } = await loadTextContent({
        source: './asset/svg/lettering-mob.svg?v=1.3',
    });

    const props =
        scrollerParams[
            Math.max(0, Math.min(Number(version), scrollerParams.length - 1))
        ];

    if (!props) return '';

    /** Quicknav */
    updateQuickNavState({
        active: true,
        prevRoute: props.nav.prevRoute,
        nextRoute: props.nav.nextRoute,
        backRoute: props.nav.backRoute,
    });

    updateAnimationDescription(props.description);

    return html`<div>
        <scroller-n0
            ${MobJs.staticProps(
                /** @type {import('@pagesComponent/scroller/n0/type').ScrollerN0['props']} */
                ({
                    ...props.animation,
                    background: bg,
                })
            )}
        ></scroller-n0>
    </div>`;
};
