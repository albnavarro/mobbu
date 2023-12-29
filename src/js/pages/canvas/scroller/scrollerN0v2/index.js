import { html, staticProps } from '../../../../mobjs';

export const scrollerN0v2 = () => {
    return html`<div>
        <scroller-n0
            ${staticProps({
                stagger: {
                    type: 'end',
                    each: 1,
                    from: { x: 0, y: 0 },
                    grid: { col: 11, row: 10, direction: 'radial' },
                },
                reorder: false,
            })}
        ></scroller-n0>
        <quick-nav
            ${staticProps({
                prevRoute: '#scrollerN0v1',
                nextRoute: '#scrollerN0v3',
            })}
        ></quick-nav>
    </div>`;
};
