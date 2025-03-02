import { updateQuickNavState } from '../../../component/common/quickNav/utils';
import { StarSvg } from '../../../component/common/SvgShape/Star/definition';
import { Move3DPage } from '../../../component/pages/move3D/definition';
import { html, staticProps, useComponent } from '../../../mobjs';

useComponent([Move3DPage, StarSvg]);

/** @type{import('../../../mobjs/type').PageAsync} */
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

    return html`<move-3d-page ${staticProps({ data })}></move-3d-page> `;
};
