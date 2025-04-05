import { Move3DChildren } from '@commonComponent/Move3D/type';

export type GetLettering02 = (arg0: {
    letter_d: string;
    letter_r: string;
    letter_p: string;
    letter_r_shadow: string;
    letter_d_shadow: string;
    letter_p_shadow: string;
    letter_r_pieces: string;
    letter_d_pieces: string;
    letter_p_pieces: string;
    letter_r_fill: string;
    letter_d_fill: string;
    letter_p_fill: string;
}) => Move3DChildren[];
