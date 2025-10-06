import { AnimationDescription } from '@commonComponent/animation-description/definition';
import { updateQuickNavState } from '@commonComponent/quick-nav/utils';
import { html, MobJs } from '@mobJs';
import { AnimatedPatternN1 } from '@pagesComponent/animated-pattern/n1/definition';

MobJs.useComponent([AnimatedPatternN1, AnimationDescription]);

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

    return html`<div class="l-padding">
        <animatedpattern-n1></animatedpattern-n1>
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
