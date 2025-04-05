import { updateQuickNavState } from '@commonComponent/quickNav/utils';
import { html, MobJs } from '@mobJs';
import { HorizontalScroller } from '@pagesComponent/horizontalScroller/definition';

MobJs.useComponent([HorizontalScroller]);

/** @type{import('@mobJsType').PageAsync} */
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
