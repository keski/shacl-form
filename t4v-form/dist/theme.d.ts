import { NamedNode } from 'n3';
import { Term } from '@rdfjs/types';
import { ShaclPropertyTemplate } from './property-template';
export type Editor = HTMLElement & {
    value: string;
    type?: string;
    shaclDatatype?: NamedNode<string>;
    binaryData?: string;
    checked?: boolean;
};
export type InputListEntry = {
    value: Term | string;
    label?: string;
};
export declare abstract class Theme {
    stylesheet: CSSStyleSheet;
    constructor(styles?: string);
    apply(root: HTMLFormElement): void;
    createViewer(label: string, value: Term, template: ShaclPropertyTemplate): HTMLElement;
    abstract createListEditor(label: string, value: Term | null, required: boolean, listEntries: InputListEntry[], template?: ShaclPropertyTemplate): HTMLElement;
    abstract createLangStringEditor(label: string, value: Term | null, required: boolean, template: ShaclPropertyTemplate): HTMLElement;
    abstract createTextEditor(label: string, value: Term | null, required: boolean, template: ShaclPropertyTemplate): HTMLElement;
    abstract createNumberEditor(label: string, value: Term | null, required: boolean, template: ShaclPropertyTemplate): HTMLElement;
    abstract createDateEditor(label: string, value: Term | null, required: boolean, template: ShaclPropertyTemplate): HTMLElement;
    abstract createBooleanEditor(label: string, value: Term | null, required: boolean, template: ShaclPropertyTemplate): HTMLElement;
    abstract createFileEditor(label: string, value: Term | null, required: boolean, template: ShaclPropertyTemplate): HTMLElement;
    abstract createButton(label: string, primary: boolean): HTMLElement;
}
export declare function fieldFactory(template: ShaclPropertyTemplate, value: Term | null): HTMLElement;
