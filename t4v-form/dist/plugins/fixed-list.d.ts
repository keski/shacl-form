import { Plugin, PluginOptions } from '../plugin';
import { Term } from '@rdfjs/types';
import { ShaclPropertyTemplate } from '../property-template';
import { InputListEntry } from '../theme';
export declare class FixedListPlugin extends Plugin {
    entries: InputListEntry[];
    constructor(options: PluginOptions, entries: InputListEntry[]);
    createEditor(template: ShaclPropertyTemplate, value?: Term): HTMLElement;
}
