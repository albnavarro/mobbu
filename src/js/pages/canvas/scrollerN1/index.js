import { updateQuickNavState } from '../../../component/common/quickNav/utils';
import { ScrollerN1 } from '../../../component/pages/scroller/ScrollerN1/definition';
import { html, MobJs } from '../../../mobjs';

MobJs.useComponent([ScrollerN1]);

export const scrollerN1 = () => {
    /** Quicknav */
    updateQuickNavState({
        active: true,
        prevRoute: '#scrollerN0?version=4&activeId=4',
        nextRoute: '',
        backRoute: '#canvas-overview',
        color: 'black',
    });

    return html`<div class="l-padding">
        <scroller-n1></scroller-n1>
    </div>`;
};
