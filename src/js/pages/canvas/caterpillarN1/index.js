import { updateQuickNavState } from '@commonComponent/quickNav/utils';
import { html, MobJs } from '@mobJs';
import { CaterpillarN1 } from '@pagesComponent/canvas/caterpillarN1/definition';

MobJs.useComponent([CaterpillarN1]);

export const caterpillarN1 = () => {
    /** Quicknav */
    updateQuickNavState({
        active: true,
        prevRoute: '#caterpillarN0',
        nextRoute: '#caterpillarN2',
        backRoute: '#canvas-overview',
        color: 'black',
    });

    return html`<div class="l-padding">
        <caterpillar-n1></caterpillar-n1>
    </div>`;
};
