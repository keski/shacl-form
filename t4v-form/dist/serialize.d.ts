import { NamedNode, Quad, Literal, Prefixes } from 'n3';
import { Editor } from './theme';
export declare function serialize(quads: Quad[], format: string, prefixes?: Prefixes): string;
export declare function toRDF(editor: Editor): Literal | NamedNode | undefined;
