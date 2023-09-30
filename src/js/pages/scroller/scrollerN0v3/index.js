import { html, staticProps } from '../../../mobjs';

export const scrollerN0v3 = () => {
    return html`<div>
        <scroller-n0
            ${staticProps({
                stagger: {
                    type: 'equal',
                    each: 7,
                    from: 'center',
                    grid: { col: 11, row: 10, direction: 'col' },
                },
                reorder: false,
            })}
        ></scroller-n0>
    </div>`;
};
