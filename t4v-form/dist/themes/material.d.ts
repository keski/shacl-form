import { ShaclPropertyTemplate } from '../property-template';
import { Term } from '@rdfjs/types';
import { Theme } from '../theme';
import { InputListEntry, Editor } from '../theme';
export declare class MaterialTheme extends Theme {
    constructor();
    createDefaultTemplate(label: string, value: Term | null, required: boolean, editor: Editor, template?: ShaclPropertyTemplate): HTMLElement;
    createTextEditor(label: string, value: Term | null, required: boolean, template: ShaclPropertyTemplate): HTMLElement;
    createNumberEditor(label: string, value: Term | null, required: boolean, template: ShaclPropertyTemplate): HTMLElement;
    createListEditor(label: string, value: Term | null, required: boolean, listEntries: InputListEntry[], template?: ShaclPropertyTemplate): HTMLElement;
    createBooleanEditor(label: string, value: Term | null, required: boolean, template: ShaclPropertyTemplate): HTMLElement;
    createDateEditor(label: string, value: Term | null, required: boolean, template: ShaclPropertyTemplate): HTMLElement;
    createLangStringEditor(label: string, value: Term | null, required: boolean, template: ShaclPropertyTemplate): HTMLElement;
    createFileEditor(label: string, value: Term | null, required: boolean, template: ShaclPropertyTemplate): HTMLElement;
    createButton(label: string, primary: boolean): HTMLElement;
}
