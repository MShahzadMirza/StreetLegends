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

        // -----------------------
        // Body
        // -----------------------

        const body = BABYLON.MeshBuilder.CreateBox(
            "body",
            {
                width: 2,
                height: 0.6,
                depth: 4
            },
            this.scene
        );

        body.position.y = 0.6;

        body.parent = this.root;

        const bodyMaterial = new BABYLON.StandardMaterial(
            "bodyMat",
            this.scene
        );

        bodyMaterial.diffuseColor = new BABYLON.Color3(
            0.8,
            0.1,
            0.1
        );

        body.material = bodyMaterial;

        // -----------------------
        // Cabin
        // -----------------------

        const cabin = BABYLON.MeshBuilder.CreateBox(
            "cabin",
            {
                width: 1.4,
                height: 0.7,
                depth: 2
            },
            this.scene
        );

        cabin.position.y = 1.1;
        cabin.position.z = -0.2;

        cabin.parent = this.root;

        const cabinMaterial = new BABYLON.StandardMaterial(
            "glass",
            this.scene
        );

        cabinMaterial.diffuseColor = new BABYLON.Color3(
            0.6,
            0.8,
            1
        );

        cabin.material = cabinMaterial;

        // -----------------------
        // Wheels
        // -----------------------

        this.createWheel(-0.9, 0.3, 1.3);
        this.createWheel(0.9, 0.3, 1.3);

        this.createWheel(-0.9, 0.3, -1.3);
        this.createWheel(0.9, 0.3, -1.3);

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