import { Prefixes, Store } from 'n3';
import { Term } from '@rdfjs/types';
import { ClassInstanceProvider } from './plugin';
import { Loader } from './loader';
import { Theme } from './theme';
export declare class ElementAttributes {
    shapes: string | null;
    shapesUrl: string | null;
    shapeSubject: string | null;
    values: string | null;
    valuesUrl: string | null;
    valueSubject: string | null;
    valuesNamespace: string;
    view: string | null;
    language: string;
    loading: string;
    ignoreOwlImports: string | null;
    collapse: string | null;
    submitButton: string | null;
}
export declare class Config {
    attributes: ElementAttributes;
    loader: Loader;
    classInstanceProvider: ClassInstanceProvider | undefined;
    prefixes: Prefixes;
    editMode: boolean;
    dataGraph: Store<import("@rdfjs/types").Quad, import("n3").Quad, import("@rdfjs/types").Quad, import("@rdfjs/types").Quad>;
    lists: Record<string, Term[]>;
    groups: Array<string>;
    theme: Theme;
    form: HTMLElement;
    private _shapesGraph;
    constructor(theme: Theme, form: HTMLElement);
    updateAttributes(elem: HTMLElement): void;
    static dataAttributes(): Array<string>;
    get shapesGraph(): Store;
    set shapesGraph(graph: Store);
    registerPrefixes(prefixes: Prefixes): void;
}
