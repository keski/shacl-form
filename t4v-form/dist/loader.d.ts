import { Store, Parser, NamedNode } from 'n3';
import { Config } from './config';
export declare class Loader {
    private config;
    private loadedOwlImports;
    private loadedClasses;
    constructor(config: Config);
    loadGraphs(): Promise<void>;
    importRDF(input: string | Promise<string>, store: Store, graph?: NamedNode, parser?: Parser): Promise<void>;
    fetchRDF(url: string): Promise<string>;
    toURL(id: string): string | null;
}
