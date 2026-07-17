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

        GROUND_CLEARANCE: 0.01,

        // Rotation (adjust after testing)
        ROTATION_Y: 0,

        MAX_STEER_LOW_SPEED: 35,

        MAX_STEER_HIGH_SPEED: 25,

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

    static DEBUG = {

    SHOW_CAR_CENTER: true,

    SHOW_FORWARD_VECTOR: true,

    SHOW_BOUNDING_BOX: false

};

}