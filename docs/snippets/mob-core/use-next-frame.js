import { MobCore } from '@mobCore';

const loop = () => {
    MobCore.useNextFrame(({ fps, time }) => {
        // code
        loop();
    });
};

MobCore.useFrame(() => loop());
