import { updateQuickNavState } from '@commonComponent/quick-nav/utils';
import { html, MobJs } from '@mobJs';
import { AsyncTimeline } from '@pagesComponent/async-timeline/definition';
import { loadTextContent } from '@utils/utils';

MobJs.useComponent([AsyncTimeline]);

/** @type {import('@mobJsType').Page} */
export const asyncTimeline = async () => {
    const { data: bg } = await loadTextContent({
        source: './asset/svg/lettering-mob.svg?v=1.3',
    });

    /** Quicknav */
    updateQuickNavState({
        active: true,
        prevRoute: '#caterpillarN2',
        nextRoute: '#animatedPatternN0?version=0&activeId=0',
        backRoute: '#canvas-overview',
    });

    return html`<div class="l-padding">
        <async-timeline
            ${MobJs.staticProps({ background: bg })}
        ></async-timeline>
    </div>`;
};
