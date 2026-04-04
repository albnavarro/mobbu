import { OnlyDesktopCta } from '@commonComponent/only-desktop-cta/definition';
import { html, MobJs } from '@mobJs';
import { loadTextContent } from '@utils/utils';

MobJs.useComponent([OnlyDesktopCta]);

/** @type {import('@mobJsType').Page} */
export const onlyDesktop = async () => {
    const { data: letteringMob } = await loadTextContent({
        source: './asset/svg/lettering-mob-only-desktop.svg?v=0.1',
    });

    const { data: bg } = await loadTextContent({
        source: './asset/svg/lettering-mob.svg?v=1.3',
    });

    return html`
        <div class="l-only-desktop">
            <div class="content">
                <div class="l-background-shape">${bg}</div>
                <h1>MobProject v0.1</h1>
                <h2>ops...<br /></h2>
                <p>
                    This site is designed<br />
                    for a desktop experience,<br />
                    the minimum resolution is
                    <strong>992px</strong>.<br /><br />
                    <strong>
                        Please resize your browser<br />
                        or use a different device.
                    </strong>
                </p>
                <h3>My apologies ...</h3>
                <div>
                    <only-desktop-cta></only-desktop-cta>
                </div>
                <div class="svg">${letteringMob}</div>
            </div>
        </div>
    `;
};
