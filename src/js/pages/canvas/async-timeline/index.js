import { updateAnimationDescription } from '@commonComponent/animation-description/utils';
import { updateQuickNavState } from '@commonComponent/quick-nav/utils';
import { html, MobJs } from '@mobJs';
import { AsyncTimeline } from '@pagesComponent/async-timeline/definition';

MobJs.useComponent([AsyncTimeline]);

/** @type {import('@mobJsType').Page} */
export const asyncTimeline = () => {
    /** Quicknav */
    updateQuickNavState({
        active: true,
        prevRoute: '#caterpillarN2',
        nextRoute: '#animatedPatternN0?version=0&activeId=0',
        backRoute: '#canvas-overview',
    });

    const description =
        '<strong>Canvas</strong>: TimeTween Spring & AsyncTimeline';

    updateAnimationDescription(description);

    return html`<div class="l-padding">
        <async-timeline></async-timeline>
    </div>`;
};
