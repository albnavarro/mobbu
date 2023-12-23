import { createComponent } from '../../../mobjs';
import { ShapeLeft } from './shapeLeft';
import { ShapeRight } from './shapeRight';

export const shapeRightDef = createComponent({
    name: 'shape-right',
    component: ShapeRight,
});

export const shapeLeftDef = createComponent({
    name: 'shape-left',
    component: ShapeLeft,
});
