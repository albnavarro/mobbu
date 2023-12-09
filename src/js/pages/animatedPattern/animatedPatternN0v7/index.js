import { html, staticProps } from '../../../mobjs';

export const animatedPatternN0v7 = () => {
    return html`<div class="l-padding">
        <animatedpattern-n0
            ${staticProps({
                fill: [],
                gutter: 1,
                numberOfColumn: 12,
                numberOfRow: 13,
                cellWidth: 50,
                cellHeight: 50,
                stagger: {
                    each: 20,
                    from: { x: 6, y: 6 },
                    grid: {
                        col: 13,
                        row: 13,
                        direction: 'radial',
                    },
                    waitComplete: false,
                },
                reorder: false,
            })}
        ></animatedpattern-n0>
    </div>`;
};
