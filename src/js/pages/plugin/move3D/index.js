import { updateQuickNavState } from '../../../component/common/quickNav/utils';
import { StarSvg } from '../../../component/common/SvgShape/Star/definition';
import { Move3DPage } from '../../../component/pages/move3D/definition';
import { html, MobJs } from '../../../mob/mobjs';

MobJs.useComponent([Move3DPage, StarSvg]);

/** @type{import('../../../mob/mobjs/type').PageAsync} */
export const move3DRoute = async ({ props }) => {
    const { data, prevRoute, nextRoute } = props;

    /** Quicknav */
    updateQuickNavState({
        active: true,
        prevRoute: prevRoute,
        nextRoute: nextRoute,
        backRoute: '#plugin-overview',
        color: 'white',
    });

    return html`<move-3d-page ${MobJs.staticProps({ data })}></move-3d-page> `;
};
