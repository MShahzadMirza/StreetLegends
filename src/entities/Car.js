/*
=====================================
Street Legends
Player Car
=====================================
*/

class Car {

    constructor(scene) {

        this.scene = scene;

        // Movement
        this.speed = 0;
        this.maxSpeed = 0.4;
        this.acceleration = 0.01;
        this.brakeForce = 0.02;
        this.friction = 0.005;
        this.turnSpeed = 0.03;

        this.create();

        console.log("✅ Car Created");

    }

    create() {

        // Root
        this.root = new BABYLON.TransformNode(
            "car",
            this.scene
        );

        this.modelRoot = new BABYLON.TransformNode(
            "carModel",
            this.scene
        );

        this.modelRoot.parent = this.root;

        BABYLON.SceneLoader.ImportMesh(

            "",

            Config.CAR.MODEL_PATH,

            Config.CAR.MODEL_FILE,

            this.scene,

            (meshes) => {

                // Parent ONLY the imported root
                meshes[0].parent = this.modelRoot;

                // Visual settings
                this.modelRoot.scaling.setAll(
                    Config.CAR.SCALE
                );

                this.modelRoot.rotation.y =
                    Config.CAR.ROTATION_Y;

                this.modelRoot.position.copyFrom(
                    Config.CAR.OFFSET
                );

                // Physics / gameplay position
                this.root.position.copyFrom(
                    Config.CAR.START_POSITION
                );

                console.log("✅ Lamborghini Loaded");

            }

        );

    }

    createWheel(x, y, z) {

        const wheel = BABYLON.MeshBuilder.CreateCylinder(
            "wheel",
            {
                diameter: 0.7,
                height: 0.4
            },
            this.scene
        );

        wheel.rotation.z = Math.PI / 2;

        wheel.position.set(x, y, z);

        wheel.parent = this.root;

        const material = new BABYLON.StandardMaterial(
            "wheelMat",
            this.scene
        );

        material.diffuseColor = BABYLON.Color3.Black();

        wheel.material = material;

    }

    update(input) {

        // Acceleration

        if (input.forward) {

            this.speed += this.acceleration;

        }

        if (input.backward) {

            this.speed -= this.acceleration;

        }

        // Friction

        if (!input.forward && !input.backward) {

            if (this.speed > 0) {

                this.speed -= this.friction;

            }

            if (this.speed < 0) {

                this.speed += this.friction;

            }

            if (Math.abs(this.speed) < this.friction) {

                this.speed = 0;

            }

        }

        // Clamp speed

        this.speed = Math.max(
            -this.maxSpeed / 2,
            Math.min(this.speed, this.maxSpeed)
        );

        // Steering

        if (Math.abs(this.speed) > 0.01) {

            if (input.left) {

                this.root.rotation.y -= this.turnSpeed;

            }

            if (input.right) {

                this.root.rotation.y += this.turnSpeed;

            }

        }

        // Move Forward

        const forward = new BABYLON.Vector3(
            Math.sin(this.root.rotation.y),
            0,
            Math.cos(this.root.rotation.y)
        );

        this.root.position.addInPlace(
            forward.scale(this.speed)
        );

    }

}