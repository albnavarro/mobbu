import { updateQuickNavState } from '../../../component/common/quickNav/utils';
import { ScrollerN0 } from '../../../component/pages/scroller/ScrollerN0/definition';
import { html, MobJs } from '../../../mobjs';
import { scrollerParams } from './scrollerParams';

MobJs.useComponent([ScrollerN0]);

/** @type{import('../../../mobjs/type').Page} */
export const scrollerN0 = ({ params }) => {
    const { version } = params;

    const props =
        scrollerParams[
            Math.max(0, Math.min(Number(version), scrollerParams.length - 1))
        ];

    /** Quicknav */
    updateQuickNavState({
        active: true,
        prevRoute: props.nav.prevRoute,
        nextRoute: props.nav.nextRoute,
        backRoute: props.nav.backRoute,
        color: 'black',
    });

    return html`<div>
        <scroller-n0
            ${MobJs.staticProps({
                ...props.animation,
            })}
        ></scroller-n0>
    </div>`;
};
