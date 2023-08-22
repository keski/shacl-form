import { ShaclPropertyTemplate } from './property-template'
import { InputBase, InputListEntry } from './inputs'
import { NamedNode } from "n3"
import { findInstancesOf } from './util';
import { Config } from './config';
import { SHAPES_GRAPH } from './constants';

export type Plugins = {
    [predicate: string]: Plugin;
}

export abstract class Plugin {
    predicate: string

    constructor(predicate: string) {
        this.predicate = predicate
    }

    abstract createInstance(property: ShaclPropertyTemplate, value?: string): InputBase
}

export type ClassInstanceProvider = (clazz: string) => Promise<string>

export class ClassInstanceLoader {
    private config: Config
    private provider: ClassInstanceProvider
    private loadedClasses: string[] = []

    constructor(config: Config, provider: ClassInstanceProvider) {
        this.config = config
        this.provider = provider
    }

    async loadClassInstances(clazz: NamedNode, config: Config): Promise<InputListEntry[]> {
        const className = clazz.value
        // invoke provider plugin only once for each class
        if (this.loadedClasses.indexOf(className) < 0) {
            this.loadedClasses.push(className)
            await this.config.loader.importRDF(this.provider(className), config.shapesGraph, SHAPES_GRAPH)
        }
        return findInstancesOf(clazz, config)
    }
}