import { CustomMap } from "src/app/common-utils/structures";
import {Breakpoints} from '@angular/cdk/layout';


export namespace TimelineUtils{
    const getStrokeWidth = new CustomMap<string, string>([
        [Breakpoints.XSmall, '']
    ])
}