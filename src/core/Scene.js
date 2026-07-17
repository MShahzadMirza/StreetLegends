class SceneManager {
    constructor(engine) {
        this.engine = engine;

        this.scene = new BABYLON.Scene(engine);

        this.createSky();

        this.createLighting();

        console.log('✅ Scene Created');
    }

    createSky() {
        this.scene.clearColor = new BABYLON.Color4(0.53, 0.81, 0.98, 1);
    }

    createLighting() {
        this.light = new BABYLON.HemisphericLight(
            'sun',
            new BABYLON.Vector3(0, 1, 0),
            this.scene,
        );

        this.light.intensity = 1.2;
    }

    getScene() {
        return this.scene;
    }
}
