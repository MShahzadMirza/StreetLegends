/*
=====================================
Street Legends
Main Entry
=====================================
*/

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
const environment = new Environment(scene);

const input = new Input();

const car = new Car(scene);

// Render Loop
engine.runRenderLoop(() => {

    car.update(input);
    scene.render();

    if (input.forward) {

    console.log("Forward");

}

if (input.left) {

    console.log("Left");

}

});

console.log("🚀 Game Running");