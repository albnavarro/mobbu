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
import { html, MobJs } from '@mobJs';

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

    return html`
        ${useScssTestGrid ? '<test-scss-grid></test-scss-grid>' : ''}
        <debug-overlay name="${debugOverlayName}"></debug-overlay>
        <mob-header name="${headerName}"></mob-header>
        <mob-navigation-container
            name="${mobNavigationContainerName}"
        ></mob-navigation-container>
        <main class="main">
            <div class="container">
                <div class="inner-wrap">
                    <div id="content"></div>
                </div>
            </div>
        </main>
        <mob-footer> </mob-footer>
        <quick-nav name="${quickNavName}"></quick-nav>
        <route-loader name="${routeLoader}"></route-loader>
        <scroll-down-label name="${scrollDownLabelName}"></scroll-down-label>
        <side-bar-links></side-bar-links>
        <left-sidebar name="${leftSidebarName}"></left-sidebar>
        <search-overlay name="${searchOverlay}"></search-overlay>
    `;
};
