/*
=====================================
Street Legends
Road
=====================================
*/

class Road {

    constructor(scene) {

        this.scene = scene;

        this.createRoad();

        this.createCenterLine();

        console.log("✅ Road Created");

    }

    createRoad() {

        // Asphalt

        this.mesh = BABYLON.MeshBuilder.CreateGround(

            "road",

            {

                width: 12,
                height: 180

            },

            this.scene

        );

        this.mesh.position.y = 0.02;

        const material = new BABYLON.StandardMaterial(

            "roadMaterial",

            this.scene

        );

        material.diffuseColor = new BABYLON.Color3(

            0.18,
            0.18,
            0.18

        );

        this.mesh.material = material;

        this.mesh.metadata = {
            drivable: true
        };

    }

    createCenterLine() {

        const line = BABYLON.MeshBuilder.CreateGround(

            "centerLine",

            {

                width: 0.3,
                height: 180

            },

            this.scene

        );

        line.position.y = 0.03;

        const material = new BABYLON.StandardMaterial(

            "lineMaterial",

            this.scene

        );

        material.diffuseColor = BABYLON.Color3.White();

        line.material = material;

    }

}