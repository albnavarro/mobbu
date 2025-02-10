import { HorizontalScroller } from '../../../component/pages/horizontalScroller/definition';
import { html, staticProps, useComponent } from '../../../mobjs';

useComponent([HorizontalScroller]);

/** @type{import('../../../mobjs/type').PageAsync} */
export const horizontalScroller = async () => {
    return html`<div>
        <horizontal-scroller
            ${staticProps({
                animatePin: false,
                prevRoute: '',
                nextRoute: '#move3D-shape1',
            })}
        ></horizontal-scroller>
    </div>`;
};
