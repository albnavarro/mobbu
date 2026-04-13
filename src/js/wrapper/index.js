import { DebugOverlay } from '@commonComponent/debug/debug-overlay/definition';
import { SideBarLinks } from '@commonComponent/side-bar-links/definition';
import { QuickNav } from '@commonComponent/quick-nav/definition';
import { LeftSidebar } from '@commonComponent/left-sidebar/definition';
import { RouteLoader } from '@commonComponent/route-loader/definition';
import { ScrollDownLabel } from '@commonComponent/scroll-down-label/definition';
import { SearchOverlay } from '@commonComponent/search/search-overlay/definition';
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
import { StarSvg } from '@commonComponent/svg-shape/star/definition';
import { DebugTreeItem } from '@commonComponent/debug/debug-overlay/tree/item/definition';
import { Snippet } from '@commonComponent/snippet/definition';
import { SpacerAnchor } from '@commonComponent/spacer-anchor/definition';
import { AnchorButton } from '@commonComponent/typography/anchor-button/definition';
import { List } from '@commonComponent/typography/list/definition';
import { Paragraph } from '@commonComponent/typography/paragraph/definition';
import { Title } from '@commonComponent/typography/titles/definition';
import { DocSvg } from '@commonComponent/doc-svg/definition';
import { BenchMarkInvalidate } from '@pagesComponent/benchmark/invalidate/definition';
import { BenchMarkRepeatNoKey } from '@pagesComponent/benchmark/repeat-no-key/definition';
import { BenchMarkRepeatWithKey } from '@pagesComponent/benchmark/repeat-key/definition';
import { BenchMarkRepeatWithKeyNested } from '@pagesComponent/benchmark/repeat-key-nested/definition';
import { BenchMarkRepeatWithNoKeyNested } from '@pagesComponent/benchmark/repeat-no-key-nested/definition';
import { BenchMarkRepeatNoKeyBindStore } from '@pagesComponent/benchmark/repeat-no-key-bind-store/definition';
import { BenchMarkRepeatNoComponentNoKey } from '@pagesComponent/benchmark/repeat-no-component-no-key/definition';
import { BenchMarkRepeatNoComponentWithKey } from '@pagesComponent/benchmark/repeat-no-component-key/definition';

/**
 * Preload component used by tag and not loaded by default with htmlObject.component props
 */
MobJs.useComponent([
    StarSvg,
    DebugTreeItem,
    Snippet,
    SpacerAnchor,
    AnchorButton,
    List,
    Paragraph,
    Title,
    DocSvg,
    BenchMarkInvalidate,
    BenchMarkRepeatNoKey,
    BenchMarkRepeatWithKey,
    BenchMarkRepeatWithKeyNested,
    BenchMarkRepeatWithNoKeyNested,
    BenchMarkRepeatNoKeyBindStore,
    BenchMarkRepeatNoComponentNoKey,
    BenchMarkRepeatNoComponentWithKey,
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
