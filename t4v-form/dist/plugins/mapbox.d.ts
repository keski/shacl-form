/// <reference types="mapbox__mapbox-gl-draw" />
import { Term } from '@rdfjs/types';
import { Plugin, PluginOptions } from '../plugin';
import { ShaclPropertyTemplate } from '../property-template';
import { Editor } from '../theme';
import { Map } from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import { Geometry } from './map-util';
export declare class MapboxPlugin extends Plugin {
    map: Map | undefined;
    draw: MapboxDraw | undefined;
    currentEditor: Editor | undefined;
    apiKey: string;
    constructor(options: PluginOptions, apiKey: string);
    initEditMode(form: HTMLElement): HTMLDialogElement;
    createEditor(template: ShaclPropertyTemplate, value?: Term): HTMLElement;
    createViewer(template: ShaclPropertyTemplate, value: Term): HTMLElement;
    fitToGeometry(map: Map, geometry: Geometry): void;
    deleteAllButLastDrawing(): void;
}
