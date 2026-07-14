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

// Render Loop
engine.runRenderLoop(() => {

    scene.render();

});

console.log("🚀 Game Running");