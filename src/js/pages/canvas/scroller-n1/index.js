import { updateAnimationDescription } from '@commonComponent/animation-description/utils';
import { updateQuickNavState } from '@commonComponent/quick-nav/utils';
import { html, MobJs } from '@mobJs';
import { ScrollerN1 } from '@pagesComponent/scroller/n1/definition';

MobJs.useComponent([ScrollerN1]);

export const scrollerN1 = () => {
    /** Quicknav */
    updateQuickNavState({
        active: true,
        prevRoute: '#scrollerN0?version=4&activeId=4',
        nextRoute: '',
        backRoute: '#canvas-overview',
    });

    const description = '<strong>Canvas</strong>: ScrollTrigger';

    updateAnimationDescription(description);

    return html`<div class="l-padding">
        <scroller-n1></scroller-n1>
    </div>`;
};
