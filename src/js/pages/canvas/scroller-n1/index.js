import { updateAnimationDescription } from '@commonComponent/animation-description/utils';
import { updateQuickNavState } from '@commonComponent/quick-nav/utils';
import { html, MobJs } from '@mobJs';
import { ScrollerN1 } from '@pagesComponent/scroller/n1/definition';
import { loadTextContent } from '@utils/utils';

MobJs.useComponent([ScrollerN1]);

export const scrollerN1 = async () => {
    const { data: bg } = await loadTextContent({
        source: './asset/svg/lettering-mob.svg?v=1.3',
    });

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
        <scroller-n1 ${MobJs.staticProps({ background: bg })}></scroller-n1>
    </div>`;
};
