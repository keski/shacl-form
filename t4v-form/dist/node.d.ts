import { BlankNode, NamedNode, Store } from 'n3';
import { Config } from './config';
export declare class ShaclNode extends HTMLElement {
    shaclSubject: NamedNode;
    nodeId: NamedNode | BlankNode;
    targetClass: NamedNode | undefined;
    config: Config;
    constructor(shaclSubject: NamedNode, config: Config, valueSubject: NamedNode | BlankNode | undefined, nodeKind?: NamedNode, label?: string);
    toRDF(graph: Store, subject?: NamedNode | BlankNode): (NamedNode | BlankNode);
}
