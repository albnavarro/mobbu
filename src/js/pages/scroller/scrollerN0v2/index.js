import { staticProps } from '../../../mobjs';

export const scrollerN0v2 = () => {
    return /* HTML */ `<div>
        <ScrollerN0
            ${staticProps({
                stagger: {
                    type: 'end',
                    each: 1,
                    from: { x: 0, y: 0 },
                    grid: { col: 11, row: 10, direction: 'radial' },
                },
                reorder: false,
            })}
        ></ScrollerN0>
    </div>`;
};
