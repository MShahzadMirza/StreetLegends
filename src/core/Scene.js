/*
=====================================
Street Legends
Scene Manager
=====================================
*/

class SceneManager {

    constructor(engine) {

        this.engine = engine;

        this.scene = new BABYLON.Scene(engine);

        this.createSky();

        this.createLighting();

        this.createCamera();

        console.log("✅ Scene Created");

    }

    createSky() {

        // Soft blue sky

        this.scene.clearColor = new BABYLON.Color4(
            0.53,
            0.81,
            0.98,
            1
        );

    }

    createLighting() {

        this.light = new BABYLON.HemisphericLight(
            "sun",
            new BABYLON.Vector3(
                0,
                1,
                0
            ),
            this.scene
        );

        this.light.intensity = 1.2;

    }

    createCamera() {

        this.camera = new BABYLON.ArcRotateCamera(
            "camera",

            -Math.PI / 2,

            Math.PI / 3,

            30,

            BABYLON.Vector3.Zero(),

            this.scene
        );

        this.camera.attachControl(
            document.getElementById("renderCanvas"),
            true
        );

    }

    getScene() {

        return this.scene;

    }

}