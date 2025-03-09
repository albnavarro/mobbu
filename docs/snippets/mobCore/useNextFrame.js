import { MobCore } from '../../../src/js/mobCore';

const loop = () => {
    MobCore.useNextFrame(({ fps, shouldRender, time }) => {
        // code
        loop();
    });
};

MobCore.useFrame(() => loop());
