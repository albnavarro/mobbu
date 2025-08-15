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
        color: 'black',
    });

    return html`<div class="l-padding">
        <async-timeline
            ${MobJs.staticProps(
                /** @type {import('@pagesComponent/async-timeline/type').AsyncTimeline['state']} */
                ({
                    disableOffcanvas: false,
                })
            )}
        ></async-timeline
    </div>`;
};
