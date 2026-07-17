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
        this.wheelSpinMultiplier = 10;

        // Wheel Animation
        this.steeringAngle = 0;
        this.maxSteeringAngle = BABYLON.Tools.ToRadians(Config.MAX_STEER_LOW_SPEED);

        this.wheelRotation = 0;
        this.wheelRadius = 0.35;

        this.steeringSpeed = BABYLON.Tools.ToRadians(140);
        this.steeringReturnSpeed = BABYLON.Tools.ToRadians(200);

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

            const importedRoot = result.meshes[0];

            console.log("Imported Root Position", importedRoot.position);
            console.log("Imported Root Rotation", importedRoot.rotation);
            console.log("Imported Root Scaling", importedRoot.scaling);

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

            for (const wheel of Object.values(this.wheels)) {

                if (wheel.rotationQuaternion) {

                    wheel.rotation = wheel.rotationQuaternion.toEulerAngles();
                    wheel.rotationQuaternion = null;

                }

            }

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
            this.alignToGround(this.modelRoot);

            // Gameplay position
            this.root.position.copyFrom(
                Config.CAR.START_POSITION
            );

            // this.wheels.frontLeft.showBoundingBox = true;
            // this.wheels.frontRight.showBoundingBox = true;
            // this.wheels.rearLeft.showBoundingBox = true;
            // this.wheels.rearRight.showBoundingBox = true;

            // this.wheels.frontLeft.scaling.setAll(2);
            // this.wheels.frontRight.scaling.setAll(2);

            // window.testWheel = this.wheels.frontLeft;

            // Debug
            this.inspectVehicle(result.meshes);

            this.loaded = true;

            this.validateVehicle();

            console.log("✅ Car Loaded");

            console.log("Root Position", this.root.position);

            console.log("Model Position", this.modelRoot.position);

            console.log("Body Position", this.body.position);

            console.log("Front Left", this.wheels.frontLeft.position);

            console.log("Front Right", this.wheels.frontRight.position);

            console.log("Rear Left", this.wheels.rearLeft.position);

            console.log("Rear Right", this.wheels.rearRight.position);


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

        const dt = this.scene.getEngine().getDeltaTime();

        this.animateWheels(input, dt);

    }

    alignToGround(importedRoot) {

        const bounds = importedRoot.getHierarchyBoundingVectors();

        console.log("Hierarchy Min:", bounds.min.y);
        console.log("Hierarchy Max:", bounds.max.y);

        const bottom = bounds.min.y;

        this.modelRoot.position.y =
            -bottom +
            Config.CAR.GROUND_CLEARANCE;

    }

    centerModel(meshes) {

        const body = meshes.find(m =>
            m.name.includes("Body")
        );

        if (!body)
            return;

        const box = body.getBoundingInfo().boundingBox;
        const center = box.center;

        this.modelRoot.position.x =
            (-center.x * Config.CAR.SCALE) +
            Config.CAR.OFFSET.x;

        this.modelRoot.position.z =
            (-center.z * Config.CAR.SCALE) +
            Config.CAR.OFFSET.z;

    }

    inspectVehicle(meshes) {

        console.group("🚗 Vehicle Inspector");

        meshes.forEach(mesh => {

            console.log({

                name: mesh.name,

                position: mesh.position,

                rotation: mesh.rotation,

                scaling: mesh.scaling,

                parent: mesh.parent?.name

            });

        });

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

    validateVehicle() {


        if (Config.DEBUG.SHOW_CAR_CENTER) {
            // create marker
            const marker = BABYLON.MeshBuilder.CreateSphere(
                "Center",
                {
                    diameter: 0.25
                },
                this.scene
            );

            marker.parent = this.root;

            const mat = new BABYLON.StandardMaterial(
                "centerMat",
                this.scene
            );

            mat.emissiveColor = BABYLON.Color3.Red();

            marker.material = mat;

            marker.position.y = 3;
        }

        if (Config.DEBUG.SHOW_FORWARD_VECTOR) {
            // create line
            const line = BABYLON.MeshBuilder.CreateLines(
                "Forward",
                {
                    points: [
                        BABYLON.Vector3.Zero(),
                        new BABYLON.Vector3(0, 0, 5)
                    ]
                },
                this.scene
            );

            line.color = BABYLON.Color3.Blue();

            line.parent = this.root;
        }


        console.group("🚗 Vehicle Validation");

        console.log("Body:", !!this.body);
        console.log("Glass:", !!this.glass);

        console.log("Front Left:", !!this.wheels.frontLeft);
        console.log("Front Right:", !!this.wheels.frontRight);
        console.log("Rear Left:", !!this.wheels.rearLeft);
        console.log("Rear Right:", !!this.wheels.rearRight);


        console.table({

            Body: this.body.getBoundingInfo().boundingBox.minimum.y,

            FL: this.wheels.frontLeft.getBoundingInfo().boundingBox.minimum.y,

            FR: this.wheels.frontRight.getBoundingInfo().boundingBox.minimum.y,

            RL: this.wheels.rearLeft.getBoundingInfo().boundingBox.minimum.y,

            RR: this.wheels.rearRight.getBoundingInfo().boundingBox.minimum.y

        });

        console.groupEnd();

    }

    animateWheels(input, dt) {

        // ----------------------------
        // Steering
        // ----------------------------

        if (input.left) {

            this.steeringAngle +=
                this.steeringSpeed * dt / 1000;

        }

        else if (input.right) {

            this.steeringAngle -=
                this.steeringSpeed * dt / 1000;

        }

        else {

            // Return to center

            if (this.steeringAngle > 0) {

                this.steeringAngle -=
                    this.steeringReturnSpeed * dt / 1000;

                if (this.steeringAngle < 0)
                    this.steeringAngle = 0;

            }

            if (this.steeringAngle < 0) {

                this.steeringAngle +=
                    this.steeringReturnSpeed * dt / 1000;

                if (this.steeringAngle > 0)
                    this.steeringAngle = 0;

            }

        }

        // Clamp

        // Steering becomes smaller as speed increases

        const speedRatio = BABYLON.Scalar.Clamp(
            Math.abs(this.speed) / this.maxSpeed,
            0,
            1
        );

        const maxAngle = BABYLON.Scalar.Lerp(

            BABYLON.Tools.ToRadians(Config.CAR.MAX_STEER_LOW_SPEED), // Low speed

            BABYLON.Tools.ToRadians(Config.CAR.MAX_STEER_HIGH_SPEED), // High speed

            speedRatio

        );

        // Clamp steering to the current maximum angle

        this.steeringAngle = BABYLON.Scalar.Clamp(

            this.steeringAngle,

            -maxAngle,

            maxAngle

        );

        // Rotate front wheels

        this.wheels.frontLeft.rotation.y = this.steeringAngle;
        this.wheels.frontRight.rotation.y = this.steeringAngle;
        

        // ----------------------------
        // Wheel Spin
        // ----------------------------

        // Convert travelled distance into wheel rotation

        this.wheelRotation +=
            (this.speed / this.wheelRadius) *
            (dt / 1000) *
            this.wheelSpinMultiplier;

        this.wheels.frontLeft.rotation.x =
            this.wheelRotation;

        this.wheels.frontRight.rotation.x =
            this.wheelRotation;

        this.wheels.rearLeft.rotation.x =
            this.wheelRotation;

        this.wheels.rearRight.rotation.x =
            this.wheelRotation;

    }

}