import { Plugin, PluginOptions } from '../plugin';
import { ShaclPropertyTemplate } from '../property-template';
export declare class FileUploadPlugin extends Plugin {
    onChange: (event: Event) => void;
    fileType: string | undefined;
    constructor(options: PluginOptions, onChange: (event: Event) => void, fileType?: string);
    createEditor(template: ShaclPropertyTemplate): HTMLElement;
}
