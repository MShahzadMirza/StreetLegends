/*
=====================================
Street Legends
Ground
=====================================
*/

class Ground {

    constructor(scene) {

        this.scene = scene;

        this.createGround();

        console.log("✅ Ground Created");

    }

    createGround() {

        // Create Ground
        this.mesh = BABYLON.MeshBuilder.CreateGround(

            "Ground",

            {
                width: 200,
                height: 200
            },

            this.scene

        );

        // Material
        const material = new BABYLON.StandardMaterial(
            "groundMaterial",
            this.scene
        );

        material.diffuseColor = new BABYLON.Color3(
            0.25,
            0.55,
            0.25
        );

        this.mesh.material = material;

        this.mesh.metadata = {
            drivable: true
        };

    }

    getMesh() {

        return this.mesh;

    }

}