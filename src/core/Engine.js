/*
=====================================
Street Legends
Engine Manager
=====================================
*/

class EngineManager {

    constructor(canvas) {

        this.canvas = canvas;

        this.engine = new BABYLON.Engine(
            canvas,
            true
        );

        console.log("✅ Engine Created");

        this.setupResize();

    }

    setupResize() {

        window.addEventListener("resize", () => {

            this.engine.resize();

        });

    }

    getEngine() {

        return this.engine;

    }

}