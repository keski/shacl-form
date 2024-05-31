import { Term } from '@rdfjs/types';
import { ShaclNode } from "./node";
import { ShaclProperty } from "./property";
import { Config } from './config';
import { ShaclPropertyTemplate } from './property-template';
export declare function createShaclOrConstraint(options: Term[], context: ShaclNode | ShaclProperty, config: Config): HTMLElement;
export declare function resolveShaclOrConstraint(template: ShaclPropertyTemplate, value: Term): ShaclPropertyTemplate;
