// @ts-check

import { DebugOverlay } from '@commonComponent/debug/debugOverlay/definition';
import { LinksMobJs } from '@commonComponent/linksMobJs/definition';
import { OnlyDesktop } from '@commonComponent/onlyDesktop/definition';
import { QuickNav } from '@commonComponent/quickNav/definition';
import { RouteLoader } from '@commonComponent/routeLoader/definition';
import { ScrollDownLabel } from '@commonComponent/scrolldownLabel/definition';
import { ScrollToTop } from '@commonComponent/scrollToTop/definition';
import { TestScssGrid } from '@commonComponent/TestScssGrid/definition';
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
    ScrollToTop,
    LinksMobJs,
    OnlyDesktop,
    DebugOverlay,
    TestScssGrid,
]);

export const wrapper = async () => {
    const useScssTestGrid = false;

    return html`
        ${useScssTestGrid ? '<test-scss-grid></test-scss-grid>' : ''}
        <only-desktop></only-desktop>
        <debug-overlay name="debugOverlay"></debug-overlay>
        <mob-header></mob-header>
        <mob-navigation-container
            name="navigation-container"
        ></mob-navigation-container>
        <main class="main">
            <div class="container">
                <div class="inner-wrap">
                    <div id="content"></div>
                </div>
            </div>
        </main>
        <mob-footer> </mob-footer>
        <quick-nav name="quick_nav"></quick-nav>
        <route-loader></route-loader>
        <scroll-down-label name="scroll_down_label"></scroll-down-label>
        <scroll-to-top name="scroll-to-top"></scroll-to-top>
        <links-mobjs></links-mobjs>
    `;
};
