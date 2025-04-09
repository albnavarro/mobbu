import { updateQuickNavState } from '@commonComponent/quick-nav/utils';
import { StarSvg } from '@commonComponent/svg-shape/star/definition';
import { html, MobJs } from '@mobJs';
import { Move3DPage } from '@pagesComponent/move-3d/definition';

MobJs.useComponent([Move3DPage, StarSvg]);

/** @type {import('@mobJsType').PageAsync} */
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
            /** @type {import('@pagesComponent/move-3d/type').Move3DPage['state']} */
            ({ data })
        )}
    ></move-3d-page> `;
};
