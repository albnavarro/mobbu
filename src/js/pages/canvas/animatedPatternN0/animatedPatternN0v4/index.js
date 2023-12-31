import { html, staticProps } from '../../../../mobjs';

export const animatedPatternN0v4 = () => {
    return html`<div class="l-padding">
        <animation-title
            ${staticProps({ title: 'Animated pattern N.0 v3' })}
        ></animation-title>
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
        <quick-nav
            ${staticProps({
                prevRoute: '#animatedPatternN0v3',
                nextRoute: '#animatedPatternN1',
            })}
        ></quick-nav>
    </div>`;
};
