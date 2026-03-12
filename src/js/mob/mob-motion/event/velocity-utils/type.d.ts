export type VelocityMap = Map<string, VelocityCallBack>;

export type VelocityCallBack = (arg0: VelocityParams) => void;

export interface VelocityParams {
    speed: number;
    speedX: number;
    speedY: number;
    directionX: number;
    directionY: number;
    distance: number;
    completed: boolean;
}
