# sweepline-intersections
A small module using a sweepline algorithm to detect self-intersections in polygons or polylines.

## Install
````
npm install sweepline-intersections
````

## Documentation
Valid inputs: Geojson `Polygon`, `MultiPolygon`, `LineString`, `MultiLineString`

````js
    const findIntersections = require('sweepline-intersections')

    const box = {type: 'Polygon', coordinates: [[[0, 0], [1, 0], [1, 1], [0, 1], [0, 0]]]}
    findIntersections(box)
    // returns array os intersection points

````

## Benchmarks
Tested against 
- bentley-ottmann-intersections - https://www.npmjs.com/package/bentley-ottmann-intersections
- gpsi - https://www.npmjs.com/package/geojson-polygon-self-intersections
- isects - https://www.npmjs.com/package/2d-polygon-self-intersections
````
// Switzerland (~700 vertices)
// gpsi x 37.05 ops/sec ±1.77% (49 runs sampled)
// bentleyOttmann x 2,010 ops/sec ±1.52% (89 runs sampled)
// sweepline x 2,621 ops/sec ±0.29% (95 runs sampled)
// isects x 14.29 ops/sec ±2.16% (40 runs sampled)
// - Fastest is sweepline

// Simple Case (6 vertices)
// gpsi x 246,512 ops/sec ±1.23% (90 runs sampled)
// bentleyOttmann x 546,326 ops/sec ±0.66% (92 runs sampled)
// sweepline x 1,157,425 ops/sec ±1.04% (94 runs sampled)
// - Fastest is sweepline
````

## Contributing
- For a live dev server run `npm run debug`. 
  - The geometry being tested can be modified in `debug/src/App.vue`
- There are a couple of test suites
  - `npm run test` runs all tests
  - `npm run test:e2e` does a general test that the correct number of self-intersections are found in the `test/fixtures` folder
  - `npm run test:unit` is unit style tests to make sure functions & methods do the right thing
    - these need some love


## Algorithm notes
The basic concept of this algorithm is based on a sweepline. Where this algorithm differs from the [bentley-ottmann algorithm](https://en.wikipedia.org/wiki/Bentley%E2%80%93Ottmann_algorithm) is that there is no use of a tree data structure to store the segments. The reason for the modification is because if you are dealing with polygons or polylines (rather than a random group of line segments) there is a reasonable assumption that there are going to be very few segments that lie on the same x plane.

Removing the tree structure greatly simplifies the code. The tree structure is replaced with a priority queue of segments which is sorted by the x vertex of the right endpoint of the segments. A priority queue is already used to sort the vertices which means only 1 data structure is required.

The package size of this module is 3kb compared to my implementation of the bentley-ottmann algorithm which is 16kb while performance 

### Algorithm Steps
1. Vertices are entered into a priority queue sorted from left to right
2. An item is removed from the priority queue
  - If the vertex is the left endpoint of a segment we test it against every other segment in the segment queue for intersections with any intersections recorded. We then add the vertex (and it's associated right endpoint) to the segment queue.
  - When we encounter a right endpoint we remove the first item from the segment queue.


