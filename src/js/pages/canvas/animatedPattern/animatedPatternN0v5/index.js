import { html, staticProps } from '../../../../mobjs';

export const animatedPatternN0v5 = () => {
    return html`<div class="l-padding">
        <animatedpattern-n0
            ${staticProps({
                fill: [
                    0, 13, 20, 45, 65, 71, 72, 73, 74, 75, 76, 77, 83, 92, 96,
                    113, 117, 134, 138, 155, 156, 157, 158, 159, 189, 209,
                ],
                gutter: 1,
                numberOfColumn: 10,
                numberOfRow: 10,
                cellWidth: 50,
                cellHeight: 50,
                stagger: {
                    each: 5,
                    from: 'start',
                    grid: {
                        col: 11,
                        row: 10,
                        direction: 'row',
                    },
                    waitComplete: false,
                },
                reorder: false,
            })}
        ></animatedpattern-n0>
    </div>`;
};
