import { html, MobJs } from '@mobJs';
import { updateQuickNavState } from '../../../component/common/quickNav/utils';
import { CaterpillarN0 } from '../../../component/pages/canvas/caterpillarN0/definition';

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
