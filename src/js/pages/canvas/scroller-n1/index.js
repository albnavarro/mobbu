import { AnimationDescription } from '@commonComponent/animation-description/definition';
import { updateQuickNavState } from '@commonComponent/quick-nav/utils';
import { html, MobJs } from '@mobJs';
import { ScrollerN1 } from '@pagesComponent/scroller/n1/definition';

MobJs.useComponent([ScrollerN1, AnimationDescription]);

export const scrollerN1 = () => {
    /** Quicknav */
    updateQuickNavState({
        active: true,
        prevRoute: '#scrollerN0?version=4&activeId=4',
        nextRoute: '',
        backRoute: '#canvas-overview',
        color: 'black',
    });

    const description = '<strong>Canvas</strong>: ScrollTrigger';

    return html`<div class="l-padding">
        <scroller-n1></scroller-n1>
        <animation-description
            ${MobJs.staticProps(
                /** @type {import('@commonComponent/animation-description/type').AnimationDescription['state']} */
                ({
                    content: description,
                })
            )}
        ></animation-description>
    </div>`;
};
