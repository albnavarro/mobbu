import { updateAnimationDescription } from '@commonComponent/animation-description/utils';
import { updateQuickNavState } from '@commonComponent/quick-nav/utils';
import { html, MobJs } from '@mobJs';
import { CaterpillarN0 } from '@pagesComponent/canvas/n0/definition';

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

    const description = '<strong>Canvas</strong>: spring animation';

    updateAnimationDescription(description);

    return html`<div class="l-padding">
        <caterpillar-n0></caterpillar-n0>
    </div>`;
};
