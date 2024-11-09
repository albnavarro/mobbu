import { useMethodByName } from '../../../mobjs';

export const hideFooterShape = () => {
    useMethodByName('footer_shape_left')?.setPosition({ position: 'side' });
    useMethodByName('footer_shape_right')?.setPosition({
        position: 'side',
    });
};

export const showFooterShape = () => {
    useMethodByName('footer_shape_left')?.setPosition({
        position: 'center',
    });

    useMethodByName('footer_shape_right')?.setPosition({
        position: 'center',
    });
};
