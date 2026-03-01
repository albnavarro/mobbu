export type VelocityCallback = Map<string, (arg0: VelocityParams) => void>;

export interface VelocityParams {
    speed: number;
    x: {
        speed: number;
        direction: number;
    };
    y: {
        speed: number;
        direction: number;
    };
}
