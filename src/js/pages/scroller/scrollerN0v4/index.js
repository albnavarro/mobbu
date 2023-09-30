import { html, staticProps } from '../../../mobjs';

export const scrollerN0v4 = () => {
    return html`<div>
        <scroller-n0
            ${staticProps({
                stagger: {
                    type: 'equal',
                    each: 3,
                    from: 'end',
                    grid: { col: 11, row: 10, direction: 'row' },
                },
                reorder: false,
            })}
        ></scroller-n0>
    </div>`;
};
