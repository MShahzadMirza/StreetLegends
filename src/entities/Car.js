/*
=====================================
Street Legends
Player Car
=====================================
*/

class Car {

    constructor(scene) {

        this.scene = scene;

        this.root = new BABYLON.TransformNode(
            "car",
            scene
        );

        this.modelRoot = new BABYLON.TransformNode(
            "carModel",
            scene
        );

        this.modelRoot.parent = this.root;

        // Movement
        this.speed = 0;
        this.maxSpeed = 0.4;
        this.acceleration = 0.01;
        this.brakeForce = 0.02;
        this.friction = 0.005;
        this.turnSpeed = 0.03;

        this.loaded = false;

        console.log("✅ Car Created");

    }

    async initialize() {

        try {

            const result = await BABYLON.SceneLoader.ImportMeshAsync(

                "",

                Config.CAR.MODEL_PATH,

                Config.CAR.MODEL_FILE,

                this.scene

            );


            // Keep imported hierarchy intact
            result.meshes[0].parent = this.modelRoot;

            // ----------------------------
            // Save mesh references
            // ----------------------------

            this.body = result.meshes.find(mesh =>
                mesh.name.includes("Body")
            );

            this.glass = result.meshes.find(mesh =>
                mesh.name.includes("Glass")
            );

            this.wheels = {

                frontLeft: result.meshes.find(mesh =>
                    mesh.name.includes("Wheel_FL")
                ),

                frontRight: result.meshes.find(mesh =>
                    mesh.name.includes("Wheel_FR")
                ),

                rearLeft: result.meshes.find(mesh =>
                    mesh.name.includes("Wheel_RL")
                ),

                rearRight: result.meshes.find(mesh =>
                    mesh.name.includes("Wheel_RR")
                )

            };


            // ----------------------------
            // Visual settings
            // ----------------------------

            this.modelRoot.scaling.setAll(
                Config.CAR.SCALE
            );

            this.modelRoot.rotation.y =
                Config.CAR.ROTATION_Y;

            this.modelRoot.position.copyFrom(
                Config.CAR.OFFSET
            );

            // Center the model
            this.centerModel(result.meshes);


            // Gameplay position
            this.root.position.copyFrom(
                Config.CAR.START_POSITION
            );

            // Debug
            this.inspectModel(result.meshes);

            this.loaded = true;

            console.log("✅ Car Loaded");


        }
        catch (error) {

            console.error("❌ Failed to load car");

            console.error(error);

        }

    }

    update(input) {

        if (!this.loaded)
            return;

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

    centerModel(meshes) {

        const body = meshes.find(m =>
            m.name.includes("Body")
        );

        if (!body)
            return;

        const box = body.getBoundingInfo().boundingBox;

        const center = box.center;

        this.modelRoot.position.x = -center.x * Config.CAR.SCALE;
        this.modelRoot.position.z = -center.z * Config.CAR.SCALE;

    }

    inspectModel(meshes) {

        console.group("🚗 Vehicle Inspector");

        meshes.forEach(mesh => {

            console.log(
                mesh.name,
                mesh.getClassName()
            );

        });

        const body = meshes.find(m =>
            m.name.includes("Body")
        );

        if (body) {

            const box = body.getBoundingInfo().boundingBox;

            console.log("Body Size");

            console.table({

                Width: box.extendSize.x * 2,

                Height: box.extendSize.y * 2,

                Length: box.extendSize.z * 2

            });

        }

        console.groupEnd();

    }


}