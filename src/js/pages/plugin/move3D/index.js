import { updateQuickNavState } from '@commonComponent/quickNav/utils';
import { StarSvg } from '@commonComponent/SvgShape/Star/definition';
import { html, MobJs } from '@mobJs';
import { Move3DPage } from '@pagesComponent/move3D/definition';

MobJs.useComponent([Move3DPage, StarSvg]);

/** @type{import('@mobJsType').PageAsync} */
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

    return html`<move-3d-page
        ${MobJs.staticProps(
            /** @type{import('@pagesComponent/move3D/type').Move3DPage['state']} */
            ({ data })
        )}
    ></move-3d-page> `;
};
