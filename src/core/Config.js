/*
=====================================
Street Legends
Configuration
=====================================
*/

class Config {

    static WORLD = {

        WIDTH: 200,
        HEIGHT: 200

    };

    static ROAD = {

        WIDTH: 12,
        LENGTH: 180

    };

    static TREE = {

        TRUNK_HEIGHT: 2,
        TRUNK_DIAMETER: 0.5,

        LEAVES_DIAMETER: 2.5

    };

    static ROCK = {

        SIZE: 1

    };

    static BUSH = {

        SIZE: 1.2

    };

    // CAR Model by Ignition Labs [CC-BY] via Poly Pizza
    // https://poly.pizza/m/5zUWP5UsLg-
    static CAR = {

        // Model
        MODEL_PATH: "assets/models/cars/",
        MODEL_FILE: "Lamborghini.glb",

        // Visual adjustments
        SCALE: 0.008,

        // Rotation (adjust after testing)
        ROTATION_Y: 0,

        // Visual offset
        OFFSET: new BABYLON.Vector3(
            0,
            -0.10,
            0
        ),

        // Spawn point
        START_POSITION: new BABYLON.Vector3(
            0,
            0,
            -70
        )

    };

}