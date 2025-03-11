import { updateQuickNavState } from '../../../component/common/quickNav/utils';
import { HorizontalScroller } from '../../../component/pages/horizontalScroller/definition';
import { html, MobJs } from '../../../mobjs';

MobJs.useComponent([HorizontalScroller]);

/** @type{import('../../../mobjs/type').PageAsync} */
export const horizontalScroller = async () => {
    /** Quicknav */
    updateQuickNavState({
        active: true,
        prevRoute: '',
        nextRoute: '#move3D-shape1',
        backRoute: '#plugin-overview',
        color: 'white',
    });

    return html`<div>
        <horizontal-scroller
            ${MobJs.staticProps({
                animatePin: false,
            })}
        ></horizontal-scroller>
    </div>`;
};
