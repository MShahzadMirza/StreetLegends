/*
=====================================
Street Legends
Test Track
=====================================
*/

class TestTrack {

    constructor(scene) {

        this.scene = scene;

        this.create();

        console.log("✅ Test Track Created");

    }

    create() {

        this.createSmallBump();

        this.createSpeedBump();

        this.createRamp();

        this.createSidePlatform();

        this.createRoughRoad();

    }

    createSmallBump() {

        const bump =
            BABYLON.MeshBuilder.CreateCylinder(

                "smallBump",

                {
                    diameter: 2,
                    height: 12
                },

                this.scene

            );

        bump.rotation.z =
            Math.PI / 2;

        bump.position.set(
            0,
            0.15,
            20
        );

        const mat =
            new BABYLON.StandardMaterial(
                "bumpMat",
                this.scene
            );

        mat.diffuseColor =
            new BABYLON.Color3(
                0.3,
                0.3,
                0.3
            );

        bump.material = mat;

        bump.metadata = {
            drivable: true
        };

    }

    createSpeedBump() {

        const bump =
            BABYLON.MeshBuilder.CreateBox(

                "speedBump",

                {
                    width: 12,
                    depth: 0.8,
                    height: 0.18
                },

                this.scene

            );

        bump.position.set(
            0,
            0.09,
            40
        );

        bump.material =
            this.scene.getMaterialByName(
                "bumpMat"
            );

        bump.metadata = {
            drivable: true
        };

    }

    createRamp() {

        const ramp =
            BABYLON.MeshBuilder.CreateBox(

                "ramp",

                {
                    width: 12,
                    depth: 10,
                    height: 0.5
                },

                this.scene

            );

        ramp.rotation.x =
            BABYLON.Tools.ToRadians(10);

        ramp.position.set(
            0,
            0.5,
            65
        );

        ramp.material =
            this.scene.getMaterialByName(
                "bumpMat"
            );

        ramp.metadata = {
            drivable: true
        };

    }


    createSidePlatform() {

        const platform =
            BABYLON.MeshBuilder.CreateBox(

                "platform",

                {
                    width: 5,
                    depth: 12,
                    height: 0.4
                },

                this.scene

            );

        platform.position.set(
            -3,
            0.2,
            90
        );

        platform.material =
            this.scene.getMaterialByName(
                "bumpMat"
            );

        platform.metadata = {
            drivable: true
        };

    }


    createRoughRoad() {

        for (let i = 0; i < 25; i++) {

            const rock =
                BABYLON.MeshBuilder.CreateSphere(

                    "rock" + i,

                    {
                        diameter:
                            0.2 +
                            Math.random() * 0.4
                    },

                    this.scene

                );

            rock.position.set(

                (Math.random() - 0.5) * 8,

                0.12,

                115 + i * 1.5

            );

            rock.material =
                this.scene.getMaterialByName(
                    "bumpMat"
                );

            rock.metadata = {
                drivable: true
            };

        }

    }

}