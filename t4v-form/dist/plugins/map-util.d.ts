import { Point, Polygon } from 'geojson';
export type Geometry = Point | Polygon;
export declare const worldBounds: [number, number][];
export declare function wktToGeometry(wkt: string): Geometry | undefined;
export declare function geometryToWkt(geometry: Geometry): string;
