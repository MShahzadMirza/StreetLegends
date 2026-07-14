/*
=====================================
Street Legends
Environment
=====================================
*/

class Environment {

    constructor(scene) {

        this.scene = scene;

        this.create();

        console.log("✅ Environment Created");

    }

    create() {

        // Trees
        new Tree(this.scene, -15, -20);
        new Tree(this.scene, 15, -20);
        new Tree(this.scene, -15, 20);
        new Tree(this.scene, 15, 20);

        // Bushes
        new Bush(this.scene, -10, -10);
        new Bush(this.scene, 10, 10);

        // Rocks
        new Rock(this.scene, -20, 5);
        new Rock(this.scene, 20, -5);

    }

}