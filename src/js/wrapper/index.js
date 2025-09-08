import { DebugOverlay } from '@commonComponent/debug/debug-overlay/definition';
import { LinksMobJs } from '@commonComponent/links-mob-js/definition';
import { QuickNav } from '@commonComponent/quick-nav/definition';
import { RouteLoader } from '@commonComponent/route-loader/definition';
import { ScrollDownLabel } from '@commonComponent/scroll-down-label/definition';
import { TestScssGrid } from '@commonComponent/test-scss-grid/definition';
import { Footer } from '@layoutComponent/footer/definition';
import { Header } from '@layoutComponent/header/definition';
import { NavigationContainer } from '@layoutComponent/navigation/definition';
import { html, MobJs } from '@mobJs';
import {
    debugOverlayName,
    headerName,
    mobNavigationContainerName,
    quickNavName,
    rightSidebarName,
    scrollDownLabelName,
    searchOverlay,
} from '../component/instance-name';
import { SearchOverlay } from '@commonComponent/search/search-overlay/definition';
import { RightSidebar } from '@commonComponent/right-sidebar/definition';

MobJs.useComponent([
    Header,
    NavigationContainer,
    Footer,
    QuickNav,
    RouteLoader,
    ScrollDownLabel,
    LinksMobJs,
    DebugOverlay,
    TestScssGrid,
    SearchOverlay,
    RightSidebar,
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
        <route-loader></route-loader>
        <scroll-down-label name="${scrollDownLabelName}"></scroll-down-label>
        <links-mobjs></links-mobjs>
        <right-sidebar name="${rightSidebarName}"></right-sidebar>
        <search-overlay name="${searchOverlay}"></search-overlay>
    `;
};
