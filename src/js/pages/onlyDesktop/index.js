import { OnlyDesktopCta } from '@commonComponent/only-desktop-cta/definition';
import { htmlObject, html, MobJs } from '@mobJs';
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

    return htmlObject({
        className: 'l-only-desktop',
        content: {
            className: 'content',
            content: [
                {
                    className: 'l-background-shape',
                    content: bg,
                },
                {
                    tag: 'h1',
                    content: 'MobProject v0.1',
                },
                {
                    tag: 'h2',
                    content: 'ops...<br />',
                },
                {
                    tag: 'p',
                    content: html`This site is designed<br />
                        for a desktop experience,<br />
                        the minimum resolution is
                        <strong>992px</strong>.<br /><br />
                        <strong>
                            Please resize your browser<br />
                            or use a different device.
                        </strong> `,
                },
                {
                    tag: 'h3',
                    content: 'My apologies ...',
                },
                {
                    content: {
                        component: OnlyDesktopCta,
                    },
                },
                {
                    className: 'svg',
                    content: letteringMob,
                },
            ],
        },
    });
};
