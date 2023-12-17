interface deafults {
    usePassive?: boolean;
    fpsScalePercent?: { [key: string]: number };
    useScaleFps?: boolean;
    deferredNextTick?: boolean;
    throttle?: number;
    mq?: { [key: string]: number };
    defaultMq?: {
        value?: string;
        type?: 'min' | 'max';
    };
    sequencer?: {
        duration?: number;
        ease?:
            | 'easeLinear'
            | 'easeInQuad'
            | 'easeOutQuad'
            | 'easeInOutQuad'
            | 'easeInCubic'
            | 'easeOutCubic'
            | 'easeInOutCubic'
            | 'easeInQuart'
            | 'easeOutQuart'
            | 'easeInOutQuart'
            | 'easeInQuint'
            | 'easeOutQuint'
            | 'easeInOutQuint'
            | 'easeInSine'
            | 'easeOutSine'
            | 'easeInOutSine'
            | 'easeInExpo'
            | 'easeOutExpo'
            | 'easeInOutExpo'
            | 'easeInCirc'
            | 'easeOutCirc'
            | 'easeInOutCirc'
            | 'easeInElastic'
            | 'easeOutElastic'
            | 'easeInOutElastic'
            | 'easeInBack'
            | 'easeOutBack'
            | 'easeInOutBack'
            | 'easeInBounce'
            | 'easeOutBounce'
            | 'easeInOutBounce';
    };
    scrollTrigger?: {
        lerpConfig?: number;
        springConfig?: 'default' | 'gentle' | 'wobbly' | 'bounce' | 'scroller';
        markerColor?: {
            startEnd?: string;
            item?: string;
        };
    };
    parallax?: {
        defaultRange?: number;
        springConfig?: 'default' | 'gentle' | 'wobbly' | 'bounce' | 'scroller';
        lerpConfig?: number;
    };
    parallaxTween?: {
        duration?: number;
        ease?: easeTypes;
    };
    tween?: {
        duration?: number;
        ease?:
            | 'easeLinear'
            | 'easeInQuad'
            | 'easeOutQuad'
            | 'easeInOutQuad'
            | 'easeInCubic'
            | 'easeOutCubic'
            | 'easeInOutCubic'
            | 'easeInQuart'
            | 'easeOutQuart'
            | 'easeInOutQuart'
            | 'easeInQuint'
            | 'easeOutQuint'
            | 'easeInOutQuint'
            | 'easeInSine'
            | 'easeOutSine'
            | 'easeInOutSine'
            | 'easeInExpo'
            | 'easeOutExpo'
            | 'easeInOutExpo'
            | 'easeInCirc'
            | 'easeOutCirc'
            | 'easeInOutCirc'
            | 'easeInElastic'
            | 'easeOutElastic'
            | 'easeInOutElastic'
            | 'easeInBack'
            | 'easeOutBack'
            | 'easeInOutBack'
            | 'easeInBounce'
            | 'easeOutBounce'
            | 'easeInOutBounce';
        relative?: boolean;
    };
    spring?: {
        relative?: boolean;
        config?: {
            default?: {
                friction: number;
                mass: number;
                precision: number;
                tension: number;
                velocity: number;
            };
            gentle?: {
                friction: number;
                mass: number;
                precision: number;
                tension: number;
                velocity: number;
            };
            wobbly?: {
                friction: number;
                mass: number;
                precision: number;
                tension: number;
                velocity: number;
            };
            bounce?: {
                friction: number;
                mass: number;
                precision: number;
                tension: number;
                velocity: number;
            };
            scroller?: {
                friction: number;
                mass: number;
                precision: number;
                tension: number;
                velocity: number;
            };
            default?: {
                friction: number;
                mass: number;
                precision: number;
                tension: number;
                velocity: number;
            };
            [key: string]: {
                friction: number;
                mass: number;
                precision: number;
                tension: number;
                velocity: number;
            };
        };
    };
    lerp?: {
        relative?: boolean;
        precision?: number;
        velocity?: number;
    };
}
