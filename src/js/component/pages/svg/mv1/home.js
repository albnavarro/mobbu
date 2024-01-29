import { m3Animation } from './animation';

const playAnimation = async ({ playIntro, playSvg }) => {
    await playIntro();
    playSvg();
};

/**
 * @param {import('../../../mobjs/type').componentType}
 */
export const Mv1Component = ({ html, onMount, getState }) => {
    const { svg } = getState();

    onMount(async ({ refs }) => {
        const { svg_group } = refs;

        const { destroy, playIntro, playSvg } = m3Animation({
            refs: svg_group,
        });

        playAnimation({ playIntro, playSvg });

        return () => {
            destroy();
        };
    });

    return html`<div class="mv1-container">
        <div class="mv1-svg">${svg}</div>
    </div>`;
};
