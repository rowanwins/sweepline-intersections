import { FeatureCollection, Feature, GeometryObject } from "geojson";

declare namespace sweeplineIntersections {
  export type Intersection = [number, number];
}

declare function sweeplineIntersections(
  geojson: FeatureCollection<GeometryObject> | Feature<GeometryObject>,
  ignoreSelfIntersections: boolean
): [number, number][];

export = sweeplineIntersections;
