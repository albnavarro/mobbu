const loop = () => {
    mobCore.useNextFrame(({ fps, shouldRender, time }) => {
        // code
        loop();
    });
};

mobCore.useFrame(() => loop());
