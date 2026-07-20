/*
=====================================
Street Legends
Player Car
=====================================
*/

class Car {

    constructor(scene) {

        this.scene = scene;

        /* this.scene.meshes.forEach(mesh => {

            if (mesh.metadata?.drivable) {

                console.log("✅ Drivable:", mesh.name);

            }

        }); */

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
        this.turnSpeed = 0.03;
        this.wheelSpinMultiplier = 10;

        // ----------------------------
        // Drift
        // ----------------------------

        this.isDrifting = false;
        this.wasDrifting = false;

        this.driftAmount = 0;

        this.maxDrift = 0.35;

        this.driftBuildSpeed = 0.08;

        this.driftRecoverSpeed = 0.05;

        // Visual Drift

        this.driftAngle = 0;

        this.maxDriftAngle = BABYLON.Tools.ToRadians(12);

        this.driftSmoothness = 0.08;

        // ----------------------------
        // Tire Grip
        // ----------------------------

        this.frontGrip = 1.0;
        this.rearGrip = 1.0;

        this.minRearGrip = 0.55;

        // ----------------------------
        // Engine Physics
        // ----------------------------

        this.enginePower = 0.012;

        this.reversePower = 0.007;

        this.brakingPower = 0.025;

        // Natural slowing
        this.rollingResistance = 0.0025;

        this.airResistance = 0.004;

        // ----------------------------
        // Body Movement
        // ----------------------------

        this.bodyRoll = 0;
        this.bodyPitch = 0;

        this.maxRoll = BABYLON.Tools.ToRadians(5);
        this.maxPitch = BABYLON.Tools.ToRadians(2.5);

        this.bodySmoothness = 0.08;

        this.bodyBounce = 0;

        this.maxBounce = 0.05;

        this.bounceSmoothness = 0.08;

        this.previousSpeed = 0;


        // Wheel Animation
        this.steeringAngle = 0;
        this.minSteeringAngle = BABYLON.Tools.ToRadians(Config.CAR.MAX_STEER_LOW_SPEED);
        this.maxSteeringAngle = BABYLON.Tools.ToRadians(Config.CAR.MAX_STEER_HIGH_SPEED);


        this.wheelRotation = 0;
        this.wheelRadius = 0.35;

        this.steeringSpeed = BABYLON.Tools.ToRadians(140);
        this.steeringReturnSpeed = BABYLON.Tools.ToRadians(200);

        this.suspension = {
            frontLeft: 0.40,
            frontRight: 0.40,
            rearLeft: 0.40,
            rearRight: 0.40
        };

        this.loaded = false;

        // this.skidTrail = new TrailRenderer(scene);
        this.leftTrail =
            new WheelTrailRenderer(this.scene);

        this.rightTrail =
            new WheelTrailRenderer(this.scene);



        this.skidTimer = 0;

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

            if (Config.DEBUG.ENABLED) {
                console.log("Imported Root Position", importedRoot.position);
                console.log("Imported Root Rotation", importedRoot.rotation);
                console.log("Imported Root Scaling", importedRoot.scaling);
            }

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

            for (const [name, wheel] of Object.entries(this.wheels)) {

                wheel.basePosition = wheel.position.clone();

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

            this.baseBodyHeight = this.modelRoot.position.y;

            // Gameplay position
            this.root.position.copyFrom(
                Config.CAR.START_POSITION
            );

            if (Config.DEBUG.ENABLED) {

                // this.wheels.frontLeft.showBoundingBox = true;
                // this.wheels.frontRight.showBoundingBox = true;
                // this.wheels.rearLeft.showBoundingBox = true;
                // this.wheels.rearRight.showBoundingBox = true;

                // this.wheels.frontLeft.scaling.setAll(2);
                // this.wheels.frontRight.scaling.setAll(2);

                // window.testWheel = this.wheels.frontLeft;

                // Debug
                this.inspectVehicle(result.meshes);
            }

            this.loaded = true;

            this.validateVehicle();

            this.createTireSmoke();

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


        const steeringInput =
            Math.abs(this.steeringAngle / this.maxSteeringAngle);

        this.isDrifting =

            input.handbrake &&

            Math.abs(this.speed) > this.maxSpeed * 0.25 &&

            steeringInput > 0.3;

        if (this.isDrifting) {

            this.driftAmount = BABYLON.Scalar.Clamp(

                this.driftAmount + this.driftBuildSpeed,

                0,

                this.maxDrift

            );

        }
        else {

            this.driftAmount = Math.max(

                0,

                this.driftAmount - this.driftRecoverSpeed

            );

        }

        if (this.isDrifting) {

            this.rearGrip = BABYLON.Scalar.Lerp(
                this.rearGrip,
                this.minRearGrip,
                0.08
            );

        }
        else {

            this.rearGrip = BABYLON.Scalar.Lerp(
                this.rearGrip,
                1.0,
                0.08
            );

        }

        // Acceleration
        // ----------------------------
        // Engine
        // ----------------------------

        if (input.forward) {

            this.speed += this.enginePower;

        }

        // ----------------------------
        // Reverse / Brake
        // ----------------------------

        if (input.backward) {

            if (this.speed > 0) {

                this.speed -= this.brakingPower;

            }
            else {

                this.speed -= this.reversePower;

            }

        }

        // ----------------------------
        // Natural Drag
        // ----------------------------

        if (!input.forward && !input.backward) {

            const drag =

                this.rollingResistance +

                this.airResistance *
                Math.abs(this.speed);

            if (this.speed > 0) {

                this.speed = Math.max(
                    0,
                    this.speed - drag
                );

            }

            else if (this.speed < 0) {

                this.speed = Math.min(
                    0,
                    this.speed + drag
                );

            }

        }

        // ----------------------------
        // Clamp Speed
        // ----------------------------

        this.speed = BABYLON.Scalar.Clamp(

            this.speed,

            -this.maxSpeed * 0.45,

            this.maxSpeed

        );

        // Steering
        // ----------------------------
        // Vehicle Turning
        // ----------------------------

        if (Math.abs(this.speed) > 0.01) {

            const speedRatio =
                this.speed / this.maxSpeed;

            let turnAmount =
                (this.steeringAngle / this.maxSteeringAngle) *
                this.turnSpeed *
                speedRatio;

            // Rear tires with less grip allow the car to rotate more.

            const driftMultiplier =
                1 + (1 - this.rearGrip) * 1.5;

            turnAmount *= driftMultiplier;

            this.root.rotation.y -= turnAmount;

        }

        // Move Forward

        const forward =
            this.root.forward.clone();

        forward.y = 0;
        forward.normalize();

        this.root.position.addInPlace(
            forward.scale(this.speed)
        );

        const dt = this.scene.getEngine().getDeltaTime();

        this.animateWheels(input, dt);

        this.updateSuspension();

        this.animateSuspension();

        this.animateBody(input);

        this.animateDrift(input);

        this.updateTireSmoke();

        this.updateSkidMarks(dt);

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

        if (!Config.DEBUG.SHOW_CAR_CENTER) { return }

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

            this.minSteeringAngle, // Low speed

            this.maxSteeringAngle, // High speed

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

        const rotationDelta =
            (this.speed / this.wheelRadius) *
            (dt / 1000);

        this.wheelRotation +=
            rotationDelta *
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


    animateBody(input) {

        const fl = this.suspension.frontLeft;
        const fr = this.suspension.frontRight;
        const rl = this.suspension.rearLeft;
        const rr = this.suspension.rearRight;

        const leftHeight =
            (fl + rl) * 0.5;

        const rightHeight =
            (fr + rr) * 0.5;

        const suspensionRoll =
            (leftHeight - rightHeight) * 0.4;

        const frontHeight =
            (fl + fr) * 0.5;

        const rearHeight =
            (rl + rr) * 0.5;

        const suspensionPitch =
            (frontHeight - rearHeight) * 0.3;

        const averageHeight =
            (fl + fr + rl + rr) / 4;

        const suspensionBounce =
            (0.40 - averageHeight) * 0.2;

        // acceleration

        const acceleration =
            this.speed - this.previousSpeed;

        this.previousSpeed = this.speed;

        let targetBounce = 0;

        // Accelerating
        if (acceleration > 0) {

            targetBounce =
                -this.maxBounce *
                BABYLON.Scalar.Clamp(
                    acceleration * 40,
                    0,
                    1
                );

        }

        // Braking
        else if (acceleration < 0) {

            targetBounce =
                this.maxBounce *
                BABYLON.Scalar.Clamp(
                    -acceleration * 40,
                    0,
                    1
                );

        }

        this.bodyBounce = BABYLON.Scalar.Lerp(

            this.bodyBounce,

            targetBounce,

            this.bounceSmoothness

        );

        // ---------- Roll ----------

        const speedRatio = Math.abs(this.speed) / this.maxSpeed;

        let steeringRoll =
            - (this.steeringAngle / this.maxSteeringAngle) *
            this.maxRoll *
            speedRatio;

        let targetRoll =
            steeringRoll +
            suspensionRoll;

        this.bodyRoll = BABYLON.Scalar.Lerp(

            this.bodyRoll,

            targetRoll,

            this.bodySmoothness

        );

        // ---------- Pitch ----------

        let targetPitch = suspensionPitch;

        if (input.forward)
            targetPitch += -this.maxPitch;

        else if (input.backward)
            targetPitch += this.maxPitch;

        this.bodyPitch = BABYLON.Scalar.Lerp(

            this.bodyPitch,

            targetPitch,

            this.bodySmoothness

        );

        this.modelRoot.rotation.z = this.bodyRoll;

        this.modelRoot.rotation.x = this.bodyPitch;

        this.modelRoot.position.y =
            this.baseBodyHeight +
            this.bodyBounce +
            suspensionBounce;

    }

    updateSuspension() {

        for (const [name, wheel] of Object.entries(this.wheels)) {

            const start =
                wheel.getAbsolutePosition();

            const ray = new BABYLON.Ray(

                start,

                BABYLON.Vector3.Down(),

                2

            );

            const hit =
                this.scene.pickWithRay(

                    ray,

                    mesh => mesh.metadata?.drivable === true

                );

            this.suspension[name] = hit.hit
                ? hit.distance
                : 0.40;

        }

    }

    animateSuspension() {

        for (const [name, wheel] of Object.entries(this.wheels)) {

            const compression =
                0.40 - this.suspension[name];

            wheel.position.y =
                wheel.basePosition.y +
                compression;

        }

    }

    animateDrift(input) {

        let targetAngle = 0;

        if (this.isDrifting) {

            targetAngle =

                -(this.steeringAngle / this.maxSteeringAngle) *

                this.maxDriftAngle;

        }

        this.driftAngle = BABYLON.Scalar.Lerp(

            this.driftAngle,

            targetAngle,

            this.driftSmoothness

        );

        this.modelRoot.rotation.y =
            Config.CAR.ROTATION_Y +
            this.driftAngle;

    }

    createTireSmoke() {

        this.leftSmoke = this.createSmokeSystem("LeftSmoke");
        this.rightSmoke = this.createSmokeSystem("RightSmoke");

    }

    createSmokeSystem(name) {

        const smoke = new BABYLON.ParticleSystem(
            name,
            150,
            this.scene
        );

        smoke.particleTexture = new BABYLON.Texture(
            "Assets/Textures/smoke.png",
            this.scene
        );

        smoke.minSize = 0.15;
        smoke.maxSize = 0.45;

        smoke.minLifeTime = 0.25;
        smoke.maxLifeTime = 0.7;

        smoke.emitRate = 0;

        smoke.blendMode =
            BABYLON.ParticleSystem.BLENDMODE_ONEONE;

        smoke.direction1 =
            new BABYLON.Vector3(-0.2, 0.5, -0.2);

        smoke.direction2 =
            new BABYLON.Vector3(0.2, 0.7, 0.2);

        smoke.minEmitPower = 0.2;
        smoke.maxEmitPower = 0.5;

        smoke.gravity =
            new BABYLON.Vector3(0, 0.4, 0);

        smoke.color1 =
            new BABYLON.Color4(0.75, 0.75, 0.75, 0.6);

        smoke.color2 =
            new BABYLON.Color4(0.6, 0.6, 0.6, 0.4);

        smoke.colorDead =
            new BABYLON.Color4(0.6, 0.6, 0.6, 0);

        smoke.start();

        return smoke;

    }

    updateTireSmoke() {

        const drifting =

            this.isDrifting &&

            Math.abs(this.speed) > 0.12 &&

            Math.abs(this.steeringAngle) >
            BABYLON.Tools.ToRadians(12);

        if (!drifting) {

            this.leftSmoke.emitRate = 0;
            this.rightSmoke.emitRate = 0;

            return;

        }

        const emitRate =
            80 +
            Math.abs(this.speed) * 400;

        this.leftSmoke.emitRate = emitRate;
        this.rightSmoke.emitRate = emitRate;

        this.leftSmoke.emitter =
            this.wheels.rearLeft.getAbsolutePosition();

        this.rightSmoke.emitter =
            this.wheels.rearRight.getAbsolutePosition();

    }
    /* using TrailRenderer now
        updateSkidMarks(dt) {
    
            this.skidTimer += dt;
    
            if (this.skidTimer < 15)
                return;
    
            this.skidTimer = 0;
    
            if (!this.isDrifting)
                return;
    
            const left =
                this.wheels.rearLeft.getAbsolutePosition();
    
            const right =
                this.wheels.rearRight.getAbsolutePosition();
    
            const direction = Math.atan2(
                this.root.forward.x,
                this.root.forward.z
            );
    
            this.skidMarks.addMark(left, direction);
            this.skidMarks.addMark(right, direction);
    
    
        } */

    updateSkidMarks(dt) {

        // Drift ended
        if (!this.isDrifting) {

            this.wasDrifting = false;
            return;

        }

        // Drift just started
        if (!this.wasDrifting) {

            this.leftTrail.startNewTrail();
            this.rightTrail.startNewTrail();

            this.wasDrifting = true;

        }

        this.skidTimer += dt;

        if (this.skidTimer < 20)
            return;

        this.skidTimer = 0;

        this.leftTrail.add(

            this.wheels.rearLeft.getAbsolutePosition(),
            this.root.forward

        );

        this.rightTrail.add(

            this.wheels.rearRight.getAbsolutePosition(),
            this.root.forward

        );

    }

}