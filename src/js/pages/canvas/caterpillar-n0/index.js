import { AnimationDescription } from '@commonComponent/animation-description/definition';
import { updateQuickNavState } from '@commonComponent/quick-nav/utils';
import { html, MobJs } from '@mobJs';
import { CaterpillarN0 } from '@pagesComponent/canvas/n0/definition';

MobJs.useComponent([CaterpillarN0, AnimationDescription]);

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

    return html`<div class="l-padding">
        <caterpillar-n0></caterpillar-n0>
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
