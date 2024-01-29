import { m3Animation } from './animation';
import { getLegendData } from '../../../../data';

const playAnimation = async ({ playIntro, playSvg }) => {
    await playIntro();
    playSvg();
};

/**
 * @param {import("../../../../mobjs/type").componentType}
 */
export const Mv1Component = ({ html, onMount, staticProps, getState }) => {
    const { svg } = getState();
    const { mv1 } = getLegendData();
    const { source } = mv1;

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
        <code-button
            ${staticProps({
                drawers: [
                    {
                        label: 'description',
                        source: source.description,
                    },
                    {
                        label: 'definition',
                        source: source.definition,
                    },
                    {
                        label: 'component',
                        source: source.component,
                    },
                    {
                        label: 'animation',
                        source: source.animation,
                    },
                ],
                style: 'legend',
            })}
        >
        </code-button>
    </div>`;
};
