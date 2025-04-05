import { updateQuickNavState } from '@commonComponent/quickNav/utils';
import { html, MobJs } from '@mobJs';
import { CaterpillarN2 } from '@pagesComponent/canvas/caterpillarN2/definition';

MobJs.useComponent([CaterpillarN2]);

export const caterpillarN2 = () => {
    /** Quicknav */
    updateQuickNavState({
        active: true,
        prevRoute: '#caterpillarN1',
        nextRoute: '#animatedPatternN0?version=0&activeId=0',
        backRoute: '#canvas-overview',
        color: 'black',
    });

    return html`<div class="l-padding">
        <caterpillar-n2></caterpillar-n2>
    </div>`;
};
