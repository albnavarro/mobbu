import { createProps } from '../../../mobjs';

export const scrollerN0v2Module = () => {
    return /* HTML */ `<div>
        <ScrollerN0
            data-props=${createProps({
                stagger: {
                    type: 'end',
                    each: 1,
                    from: { x: 0, y: 0 },
                    grid: { col: 11, row: 10, direction: 'radial' },
                },
                reorder: false,
            })}
            data-cancellable
        ></ScrollerN0>
    </div>`;
};
