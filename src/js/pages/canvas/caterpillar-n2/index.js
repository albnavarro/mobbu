import { AnimationDescription } from '@commonComponent/animation-description/definition';
import { updateQuickNavState } from '@commonComponent/quick-nav/utils';
import { html, MobJs } from '@mobJs';
import { CaterpillarN2 } from '@pagesComponent/canvas/n2/definition';

MobJs.useComponent([CaterpillarN2, AnimationDescription]);

export const caterpillarN2 = () => {
    /** Quicknav */
    updateQuickNavState({
        active: true,
        prevRoute: '#caterpillarN1',
        nextRoute: '#async-timeline',
        backRoute: '#canvas-overview',
        color: 'black',
    });

    const description = '<strong>Canvas</strong>: Sequencer & SyncTimeline';

    return html`<div class="l-padding">
        <caterpillar-n2></caterpillar-n2>
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
