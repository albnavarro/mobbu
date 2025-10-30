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
                <h2 class="l-only-desktop__title">ops...<br /></h2>
                <p>
                    This site is designed<br />
                    for a desktop experience,<br />
                    the minimum resolution is 1024px.<br /><br />
                    <strong>
                        Please resize your browser<br />
                        or use a different device.
                    </strong>
                </p>
                <h3 class="l-only-desktop__title">My apologies ...</h3>
                <div>
                    <only-desktop-cta></only-desktop-cta>
                </div>
                <div class="l-only-desktop__svg">${letteringMob}</div>
            </div>
        </div>
    `;
};
