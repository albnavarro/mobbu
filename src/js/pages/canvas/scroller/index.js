import { updateQuickNavState } from '@commonComponent/quick-nav/utils';
import { html, MobJs } from '@mobJs';
import { ScrollerN0 } from '@pagesComponent/scroller/n0/definition';
import { scrollerParams } from './scroller-params';
import { AnimationDescription } from '@commonComponent/animation-description/definition';

MobJs.useComponent([ScrollerN0, AnimationDescription]);

/** @type {import('@mobJsType').Page} */
export const scrollerN0 = ({ params }) => {
    const { version } = params;

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
        color: 'black',
    });

    return html`<div>
        <scroller-n0
            ${MobJs.staticProps(
                /** @type {import('@pagesComponent/scroller/n0/type').ScrollerN0['state']} */
                ({
                    ...props.animation,
                })
            )}
        ></scroller-n0>
        <animation-description
            ${MobJs.staticProps(
                /** @type {import('@commonComponent/animation-description/type').AnimationDescription['state']} */
                ({
                    content: props.description,
                })
            )}
        ></animation-description>
    </div>`;
};
