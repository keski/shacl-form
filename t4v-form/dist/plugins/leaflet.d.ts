import * as L from 'leaflet';
import 'leaflet-editable/src/Leaflet.Editable.js';
import 'leaflet.fullscreen/Control.FullScreen.js';
import { Term } from '@rdfjs/types';
import { Plugin, PluginOptions } from '../plugin';
import { Editor } from '../theme';
import { ShaclPropertyTemplate } from '../property-template';
import { Geometry } from './map-util';
export declare class LeafletPlugin extends Plugin {
    map: L.Map | undefined;
    currentEditor: Editor | undefined;
    createdGeometry: Geometry | undefined;
    displayedShape: L.Polygon | L.Marker | undefined;
    constructor(options: PluginOptions);
    initEditMode(form: HTMLElement): HTMLDialogElement;
    createEditor(template: ShaclPropertyTemplate, value?: Term): HTMLElement;
    createViewer(template: ShaclPropertyTemplate, value: Term): HTMLElement;
    drawAndZoomToGeometry(geometry: Geometry | undefined, map: L.Map): void;
}
