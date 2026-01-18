import { updateAnimationDescription } from '@commonComponent/animation-description/utils';
import { updateQuickNavState } from '@commonComponent/quick-nav/utils';
import { html, MobJs } from '@mobJs';
import { AnimatedPatternN1 } from '@pagesComponent/animated-pattern/n1/definition';
import { loadTextContent } from '@utils/utils';

MobJs.useComponent([AnimatedPatternN1]);

export const animatedPatternN1 = async () => {
    const { data: bg } = await loadTextContent({
        source: './asset/svg/lettering-mob.svg?v=1.3',
    });

    /** Quicknav */
    updateQuickNavState({
        active: true,
        prevRoute: '#animatedPatternN0?version=3&activeId=3',
        nextRoute: '#scrollerN0?version=0&activeId=0',
        backRoute: '#canvas-overview',
    });

    const description =
        '<strong>Canvas</strong>: TimeTween Lerp & AsyncTimeline';

    updateAnimationDescription(description);

    return html`<div class="l-padding">
        <animatedpattern-n1
            ${MobJs.staticProps({ background: bg })}
        ></animatedpattern-n1>
    </div>`;
};
