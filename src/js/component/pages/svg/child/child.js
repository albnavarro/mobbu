import { getLegendData } from '../../../../data';

/**
 * @param {import("../../../../mobjs/type").componentType}
 */
export const SvgChild = ({ onMount, html, staticProps, getState }) => {
    const { svg } = getState();
    const { scrollerN0 } = getLegendData();
    const { source } = scrollerN0;

    onMount(() => {});

    /**
     * Desktop
     */
    return html`<div class="svg-child-container">
        <div class="svg-child">${svg}</div>
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
                color: 'green',
            })}
        >
        </code-button>
    </div>`;
};
