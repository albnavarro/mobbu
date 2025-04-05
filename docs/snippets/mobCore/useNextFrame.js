import { MobCore } from '@mobCore';

const loop = () => {
    MobCore.useNextFrame(({ fps, shouldRender, time }) => {
        // code
        loop();
    });
};

MobCore.useFrame(() => loop());
