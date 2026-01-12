import { updateAnimationDescription } from '@commonComponent/animation-description/utils';
import { updateQuickNavState } from '@commonComponent/quick-nav/utils';
import { html, MobJs } from '@mobJs';
import { RosaDiGrandiPage } from '@pagesComponent/rosa-di-grandi/definition';

MobJs.useComponent([RosaDiGrandiPage]);

/** @type {import('@mobJsType').PageAsync} */
export const rosaDiGrandiRoute = async () => {
    /** Quicknav */
    updateQuickNavState({
        active: true,
        prevRoute: '#math-animation-01',
        nextRoute: '',
        backRoute: '#plugin-overview',
    });

    const description = '<strong>Rosa di Grandi</strong>';
    updateAnimationDescription(description);

    return html`<rosa-di-grandi-page></rosa-di-grandi-page>`;
};
