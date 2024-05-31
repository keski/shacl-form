import { ShaclNode } from './node';
import { Config } from './config';
import { ClassInstanceProvider, Plugin } from './plugin';
import { Quad, Store } from 'n3';
import { Theme } from './theme';
export declare class ShaclForm extends HTMLElement {
    static get observedAttributes(): string[];
    config: Config;
    shape: ShaclNode | null;
    form: HTMLFormElement;
    initDebounceTimeout: ReturnType<typeof setTimeout> | undefined;
    constructor(theme: Theme);
    connectedCallback(): void;
    attributeChangedCallback(): void;
    private initialize;
    serialize(format?: string, graph?: Store<import("rdf-js").Quad, Quad, import("rdf-js").Quad, import("rdf-js").Quad>): string;
    toRDF(graph?: Store<import("rdf-js").Quad, Quad, import("rdf-js").Quad, import("rdf-js").Quad>): Store;
    registerPlugin(plugin: Plugin): void;
    setTheme(theme: Theme): void;
    setClassInstanceProvider(provider: ClassInstanceProvider): void;
    validate(ignoreEmptyValues?: boolean): Promise<boolean>;
    private createValidationErrorDisplay;
    private findRootShaclShapeSubject;
}
