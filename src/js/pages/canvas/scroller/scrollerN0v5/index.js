import { html, staticProps } from '../../../../mobjs';

export const scrollerN0v5 = () => {
    return html`<div>
        <scroller-n0
            ${staticProps({
                stagger: {
                    type: 'equal',
                    each: 3,
                    from: 'end',
                },
                reorder: false,
            })}
        ></scroller-n0>
        <quick-nav
            ${staticProps({
                prevRoute: '#scrollerN0v4',
                nextRoute: '#scrollerN1',
            })}
        ></quick-nav>
    </div>`;
};
