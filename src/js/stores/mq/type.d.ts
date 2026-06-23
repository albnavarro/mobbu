export type MqKeys =
    | 'xSmall'
    | 'small'
    | 'medium'
    | 'tablet'
    | 'desktop'
    | 'large'
    | 'xLarge'
    | 'xxLarge';

export interface MqStore {
    mq: MqKeys;
    fromTablet: boolean;
}
