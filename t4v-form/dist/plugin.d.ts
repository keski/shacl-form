import { ShaclPropertyTemplate } from './property-template';
import { Term } from '@rdfjs/types';
export declare function registerPlugin(plugin: Plugin): void;
export declare function listPlugins(): Plugin[];
export declare function findPlugin(predicate: string | undefined, datatype: string | undefined): Plugin | undefined;
export type PluginOptions = {
    predicate?: string;
    datatype?: string;
};
export declare abstract class Plugin {
    predicate: string | undefined;
    datatype: string | undefined;
    stylesheet: CSSStyleSheet | undefined;
    constructor(options: PluginOptions, css?: string);
    abstract createEditor(template: ShaclPropertyTemplate, value?: Term): HTMLElement;
    createViewer(template: ShaclPropertyTemplate, value: Term): HTMLElement;
}
export type ClassInstanceProvider = (clazz: string) => Promise<string>;
