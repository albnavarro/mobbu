import { DebugOverlay } from '@commonComponent/debug/debug-overlay/definition';
import { SideBarLinks } from '@commonComponent/side-bar-links/definition';
import { QuickNav } from '@commonComponent/quick-nav/definition';
import { LeftSidebar } from '@commonComponent/left-sidebar/definition';
import { RouteLoader } from '@commonComponent/route-loader/definition';
import { ScrollDownLabel } from '@commonComponent/scroll-down-label/definition';
import { SearchOverlay } from '@commonComponent/search/search-overlay/definition';
import { TestScssGrid } from '@commonComponent/test-scss-grid/definition';
import {
    debugOverlayName,
    headerName,
    mobNavigationContainerName,
    quickNavName,
    leftSidebarName,
    routeLoader,
    scrollDownLabelName,
    searchOverlay,
} from '@instanceName';
import { Footer } from '@layoutComponent/footer/definition';
import { Header } from '@layoutComponent/header/definition';
import { NavigationContainer } from '@layoutComponent/navigation/definition';
import { htmlObject, MobJs } from '@mobJs';

MobJs.useComponent([
    Header,
    NavigationContainer,
    Footer,
    QuickNav,
    RouteLoader,
    ScrollDownLabel,
    SideBarLinks,
    DebugOverlay,
    TestScssGrid,
    SearchOverlay,
    LeftSidebar,
]);

export const wrapper = async () => {
    const useScssTestGrid = false;

    return htmlObject({
        content: [
            useScssTestGrid ? '<test-scss-grid></test-scss-grid>' : '',
            {
                component: DebugOverlay,
                attributes: { name: debugOverlayName },
            },
            {
                component: Header,
                attributes: { name: headerName },
            },
            {
                component: NavigationContainer,
                attributes: { name: mobNavigationContainerName },
            },
            {
                tag: 'main',
                className: 'main',
                content: {
                    className: 'container',
                    content: {
                        className: 'inner-wrap',
                        content: {
                            attributes: { id: 'content' },
                        },
                    },
                },
            },
            {
                component: Footer,
            },
            {
                component: QuickNav,
                attributes: { name: quickNavName },
            },
            {
                component: RouteLoader,
                attributes: { name: routeLoader },
            },
            {
                component: ScrollDownLabel,
                attributes: { name: scrollDownLabelName },
            },
            {
                component: SideBarLinks,
            },
            {
                component: LeftSidebar,
                attributes: { name: leftSidebarName },
            },
            {
                component: SearchOverlay,
                attributes: { name: searchOverlay },
            },
        ],
    });
};
