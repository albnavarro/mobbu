import { updateQuickNavState } from '../../../component/common/quickNav/utils';
import { CaterpillarN2 } from '../../../component/pages/canvas/caterpillarN2/definition';
import { html, MobJs } from '../../../mob/mobjs';

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
