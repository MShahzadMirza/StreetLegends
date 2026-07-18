/*
=====================================
Street Legends
Main Entry
=====================================
*/
(async () => {
    console.clear();

    console.log("🏎️ Street Legends");

    const canvas = document.getElementById("renderCanvas");

    // Engine
    const engineManager = new EngineManager(canvas);
    const engine = engineManager.getEngine();

    // Scene
    const sceneManager = new SceneManager(engine);
    const scene = sceneManager.getScene();

    // Ground
    const ground = new Ground(scene);

    // Road
    const road = new Road(scene);

    // Environment
    const testTrack = new TestTrack(scene);
    
    // Environment
    const environment = new Environment(scene);

    const input = new Input();

    const car = new Car(scene);

    await car.initialize();
    window.thisCar = car;

    const camera = new CameraController(scene, car);

    // Render Loop
    engine.runRenderLoop(() => {

        car.update(input);
        camera.update();
        scene.render();

        if (input.forward) {

            console.log("Forward");

        }

        if (input.left) {

            console.log("Left");

        }

    });

    console.log("🚀 Game Running");
})();