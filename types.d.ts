import { FeatureCollection, Feature, GeometryObject } from "geojson";

export = function sweeplineIntersections(
  geojson: FeatureCollection<GeometryObject> | Feature<GeometryObject>,
  ignoreSelfIntersections: boolean
): [number, number][];
