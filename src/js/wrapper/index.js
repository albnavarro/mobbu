import { DebugOverlay } from '@commonComponent/debug/debug-overlay/definition';
import { SidebarLinks } from '@commonComponent/side-bar-links/definition';
import { LeftSidebar } from '@commonComponent/left-sidebar/definition';
import { RouteLoader } from '@commonComponent/route-loader/definition';
import { ScrollDownLabel } from '@commonComponent/scroll-down-label/definition';
import { SearchOverlay } from '@commonComponent/search/search-overlay/definition';
import {
    accessibilityOverlayName,
    debugOverlayName,
    headerName,
    leftSidebarName,
    routeLoader,
    scrollDownLabelName,
    searchOverlay,
    sidebarLinksName,
} from '@instanceName';
import { Footer } from '@layoutComponent/footer/definition';
import { Header } from '@layoutComponent/header/definition';
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
import { AccessibilityOverlay } from '@commonComponent/accesibility/overlay/definition';

export const wrapper = async () => {
    const shouldUseScssTestGrid = false;

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

    return htmlObject({
        content: [
            shouldUseScssTestGrid ? '<test-scss-grid></test-scss-grid>' : '',
            {
                component: Header,
                instanceName: headerName,
            },
            {
                component: AccessibilityOverlay,
                instanceName: accessibilityOverlayName,
            },
            {
                component: SearchOverlay,
                instanceName: searchOverlay,
            },
            {
                component: DebugOverlay,
                instanceName: debugOverlayName,
            },
            {
                component: LeftSidebar,
                instanceName: leftSidebarName,
            },
            {
                className: 'main-app-content',
                content: {
                    className: 'main-container',
                    content: {
                        attributes: { id: 'content' },
                    },
                },
            },
            {
                component: RouteLoader,
                instanceName: routeLoader,
            },
            {
                component: ScrollDownLabel,
                instanceName: scrollDownLabelName,
            },
            {
                component: SidebarLinks,
                instanceName: sidebarLinksName,
            },
            {
                component: Footer,
            },
        ],
    });
};
