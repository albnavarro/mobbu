import { updateQuickNavState } from '../../../component/common/quickNav/utils';
import { CaterpillarN1 } from '../../../component/pages/canvas/caterpillarN1/definition';
import { html, MobJs } from '../../../mobjs';

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
