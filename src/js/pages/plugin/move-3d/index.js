import { updateQuickNavState } from '@commonComponent/quick-nav/utils';
import { htmlObject, MobJs } from '@mobJs';
import { Move3DPage } from '@pagesComponent/move-3d/definition';
import { loadTextContent } from '@utils/utils';

/** @type {import('@mobJsType').PageAsync} */
export const move3DRoute = async ({ props }) => {
    const { data, drag, prevRoute, nextRoute } = props;

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

    return htmlObject({
        content: [
            {
                className: 'l-background-shape',
                content: bg,
            },
            {
                component: Move3DPage,
                modules: MobJs.staticProps(
                    /** @type {import('@pagesComponent/move-3d/type').Move3DPage['props']} */
                    ({ data, drag })
                ),
            },
        ],
    });
};
