import { OnlyDesktopCta } from '@commonComponent/only-desktop-cta/definition';
import { html, MobJs } from '@mobJs';
import { loadTextContent } from '@utils/utils';

MobJs.useComponent([OnlyDesktopCta]);

/** @type {import('@mobJsType').Page} */
export const onlyDesktop = async () => {
    const { data: letteringMob } = await loadTextContent({
        source: './asset/svg/lettering-mob-only-desktop.svg?v=0.1',
    });

    return html`
        <div class="l-only-desktop">
            <div class="l-only-desktop__content">
                <h4 class="l-only-desktop__title">
                    This site is a desktop<br />
                    only project
                </h4>
                <div>
                    <only-desktop-cta></only-desktop-cta>
                </div>
                <div class="l-only-desktop__svg">${letteringMob}</div>
            </div>
        </div>
    `;
};
