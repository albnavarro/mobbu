import { MobCore } from '@mobCore';

const setValue = () => {
    const value = window.innerWidth - document.documentElement.clientWidth;

    document.documentElement.style.setProperty(
        '--scrollbar-with',
        `${value}px`
    );
};

export const getScrollbarWith = () => {
    setValue();

    MobCore.useResize(() => {
        setValue();
    });
};
