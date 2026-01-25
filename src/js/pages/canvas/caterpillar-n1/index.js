import { updateQuickNavState } from '@commonComponent/quick-nav/utils';
import { html, MobJs } from '@mobJs';
import { CaterpillarN1 } from '@pagesComponent/canvas/n1/definition';
import { loadTextContent } from '@utils/utils';

MobJs.useComponent([CaterpillarN1]);

export const caterpillarN1 = async () => {
    const { data: bg } = await loadTextContent({
        source: './asset/svg/lettering-mob.svg?v=1.3',
    });

    /** Quicknav */
    updateQuickNavState({
        active: true,
        prevRoute: '',
        nextRoute: '#scrollerN1',
        backRoute: '#canvas-overview',
    });

    return html`<div class="l-padding">
        <caterpillar-n1 ${MobJs.staticProps({ background: bg })}>
        </caterpillar-n1>
    </div>`;
};
