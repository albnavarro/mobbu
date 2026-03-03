const unsubScribeVelocity = MobMotionCore.useVelocity(({ speed }) => {
    /**
     * Valore di smorzamento di speed.
     *
     * - 0: nessun effetto
     * - 1: effetto pieno
     */
    const DAMPING = 0.1;

    /**
     * Manteniamo il valore di riposo ( neutro a 1 ).
     */
    const excess = speed - 1;
    const scale = 1 + excess * DAMPING;
    spring.goTo({ scale });
});
