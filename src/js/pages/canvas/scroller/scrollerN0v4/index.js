import { html, staticProps } from '../../../../mobjs';

export const scrollerN0v4 = () => {
    return html`<div>
        <animation-title
            ${staticProps({ title: 'Scroller N.0 v4' })}
        ></animation-title>
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
        <quick-nav
            ${staticProps({
                prevRoute: '#scrollerN0v3',
                nextRoute: '#scrollerN0v5',
            })}
        ></quick-nav>
    </div>`;
};
