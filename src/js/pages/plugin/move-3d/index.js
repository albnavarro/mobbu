import { updateAnimationDescription } from '@commonComponent/animation-description/utils';
import { updateQuickNavState } from '@commonComponent/quick-nav/utils';
import { StarSvg } from '@commonComponent/svg-shape/star/definition';
import { html, MobJs } from '@mobJs';
import { Move3DPage } from '@pagesComponent/move-3d/definition';
import { loadTextContent } from '@utils/utils';

MobJs.useComponent([Move3DPage, StarSvg]);

/** @type {import('@mobJsType').PageAsync} */
export const move3DRoute = async ({ props }) => {
    const { data, prevRoute, nextRoute } = props;

    const { data: bg } = await loadTextContent({
        source: './asset/svg/lettering-mob.svg?v=1.3',
    });

    /** Quicknav */
    updateQuickNavState({
        active: true,
        prevRoute: prevRoute,
        nextRoute: nextRoute,
        backRoute: '#plugin-overview',
    });

    const description = '<strong>Move#d:</strong> css && js 3d shape';
    updateAnimationDescription(description);

    return html` <div>
        <div class="background-shape">${bg}</div>
        <move-3d-page
            ${MobJs.staticProps(
                /** @type {import('@pagesComponent/move-3d/type').Move3DPage['props']} */
                ({ data })
            )}
        ></move-3d-page>
    </div>`;
};
