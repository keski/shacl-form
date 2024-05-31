import { DefaultTheme } from './default';
import { Term } from '@rdfjs/types';
import { ShaclPropertyTemplate } from '../property-template';
import { Editor } from '../theme';
export declare class BootstrapTheme extends DefaultTheme {
    constructor();
    apply(root: HTMLFormElement): void;
    createDefaultTemplate(label: string, value: Term | null, required: boolean, editor: Editor, template?: ShaclPropertyTemplate | undefined): HTMLElement;
    createButton(label: string, primary: boolean): HTMLElement;
}
