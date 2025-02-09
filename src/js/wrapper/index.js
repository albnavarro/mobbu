// @ts-check

import { AnimationTitle } from '../component/common/animationTitle/definition';
import { QuickNav } from '../component/common/quickNav/definition';
import { RouteLoader } from '../component/common/routeLoader/definition';
import { ScrollDownLabel } from '../component/common/scrolldownLabel/definition';
import { ScrollToTop } from '../component/common/scrollToTop/definition';
import { Footer } from '../component/layout/footer/definition';
import { Header } from '../component/layout/header/definition';
import { NavigationContainer } from '../component/layout/navigation/definition';
import { html, useComponent } from '../mobjs';
import { LinksMobJs } from '../component/common/linksMobJs/definition';
import { OnlyDesktop } from '../component/common/onlyDesktop/definition';
import { DebugOverlay } from '../component/common/debug/debugOverlay/definition';
import { TestScssGrid } from '../component/common/TestScssGrid/definition';

useComponent([
    Header,
    NavigationContainer,
    Footer,
    QuickNav,
    RouteLoader,
    AnimationTitle,
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
        <animation-title name="animation_title"></animation-title>
        <scroll-down-label name="scroll_down_label"></scroll-down-label>
        <scroll-to-top name="scroll-to-top"></scroll-to-top>
        <links-mobjs></links-mobjs>
    `;
};
