import { updateAnimationDescription } from '@commonComponent/animation-description/utils';
import { updateQuickNavState } from '@commonComponent/quick-nav/utils';
import { html, MobJs } from '@mobJs';
import { CaterpillarN1 } from '@pagesComponent/canvas/n1/definition';

MobJs.useComponent([CaterpillarN1]);

export const caterpillarN1 = () => {
    /** Quicknav */
    updateQuickNavState({
        active: true,
        prevRoute: '#caterpillarN0',
        nextRoute: '#caterpillarN2',
        backRoute: '#canvas-overview',
    });

    const description = '<strong>Canvas</strong>: Spring & AnsyncTimeline';

    updateAnimationDescription(description);

    return html`<div class="l-padding">
        <caterpillar-n1></caterpillar-n1>
    </div>`;
};
