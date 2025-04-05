import { updateQuickNavState } from '@commonComponent/quickNav/utils';
import { html, MobJs } from '@mobJs';
import { CaterpillarN0 } from '@pagesComponent/canvas/caterpillarN0/definition';

MobJs.useComponent([CaterpillarN0]);

export const caterpillarN0 = () => {
    /** Quicknav */
    updateQuickNavState({
        active: true,
        prevRoute: '',
        nextRoute: '#caterpillarN1',
        backRoute: '#canvas-overview',
        color: 'black',
    });

    return html`<div class="l-padding">
        <caterpillar-n0></caterpillar-n0>
    </div>`;
};
