import { updateAnimationDescription } from '@commonComponent/animation-description/utils';
import { updateQuickNavState } from '@commonComponent/quick-nav/utils';
import { html, MobJs } from '@mobJs';
import { CaterpillarN2 } from '@pagesComponent/canvas/n2/definition';
import { loadTextContent } from '@utils/utils';

MobJs.useComponent([CaterpillarN2]);

export const caterpillarN2 = async () => {
    const { data: bg } = await loadTextContent({
        source: './asset/svg/lettering-mob.svg?v=1.3',
    });

    /** Quicknav */
    updateQuickNavState({
        active: true,
        prevRoute: '#caterpillarN1',
        nextRoute: '#async-timeline',
        backRoute: '#canvas-overview',
    });

    const description = '<strong>Canvas</strong>: Sequencer & SyncTimeline';

    updateAnimationDescription(description);

    return html`<div class="l-padding">
        <caterpillar-n2
            ${MobJs.staticProps({ background: bg })}
        ></caterpillar-n2>
    </div>`;
};
