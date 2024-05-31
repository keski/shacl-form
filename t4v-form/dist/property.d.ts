import { BlankNode, NamedNode, Store } from 'n3';
import { Term } from '@rdfjs/types';
import { Config } from './config';
import { ShaclPropertyTemplate } from './property-template';
export declare class ShaclProperty extends HTMLElement {
    template: ShaclPropertyTemplate;
    addButton: HTMLElement | undefined;
    constructor(shaclSubject: BlankNode | NamedNode, config: Config, nodeId: NamedNode | BlankNode, valueSubject?: NamedNode | BlankNode);
    addPropertyInstance(value?: Term): HTMLElement;
    updateControls(): void;
    toRDF(graph: Store, subject: NamedNode | BlankNode): void;
}
export declare function createPropertyInstance(template: ShaclPropertyTemplate, value?: Term, forceRemovable?: boolean): HTMLElement;
