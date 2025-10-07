import { updateAnimationDescription } from '@commonComponent/animation-description/utils';
import { updateQuickNavState } from '@commonComponent/quick-nav/utils';
import { html, MobJs } from '@mobJs';
import { AnimatedPatternN1 } from '@pagesComponent/animated-pattern/n1/definition';

MobJs.useComponent([AnimatedPatternN1]);

export const animatedPatternN1 = () => {
    /** Quicknav */
    updateQuickNavState({
        active: true,
        prevRoute: '#animatedPatternN0?version=3&activeId=3',
        nextRoute: '#scrollerN0?version=0&activeId=0',
        backRoute: '#canvas-overview',
        color: 'black',
    });

    const description =
        '<strong>Canvas</strong>: TimeTween Lerp & AsyncTimeline';

    updateAnimationDescription(description);

    return html`<div class="l-padding">
        <animatedpattern-n1></animatedpattern-n1>
    </div>`;
};
