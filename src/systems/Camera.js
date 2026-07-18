/*
=====================================
Street Legends
Follow Camera
=====================================
*/

class CameraController {

    constructor(scene, target) {

        this.scene = scene;
        this.target = target;

        this.baseDistance = 8;
        this.maxDistance = 11;

        this.baseHeight = 4;
        this.maxHeight = 5;

        this.followSmoothness = 0.08;

        this.camera = new BABYLON.FreeCamera(
            "camera",
            new BABYLON.Vector3(0, 5, -10),
            scene
        );

        this.camera.minZ = 0.1;

    }

    update() {

        const speedRatio = BABYLON.Scalar.Clamp(
            Math.abs(this.target.speed) / this.target.maxSpeed,
            0,
            1
        );

        const distance = BABYLON.Scalar.Lerp(
            this.baseDistance,
            this.maxDistance,
            speedRatio
        );

        const height = BABYLON.Scalar.Lerp(
            this.baseHeight,
            this.maxHeight,
            speedRatio
        );

        const rotation = this.target.root.rotation.y;

        const desired = new BABYLON.Vector3(

            this.target.root.position.x -
            Math.sin(rotation) * distance,

            this.target.root.position.y +
            height,

            this.target.root.position.z -
            Math.cos(rotation) * distance

        );

        this.camera.position = BABYLON.Vector3.Lerp(

            this.camera.position,

            desired,

            this.followSmoothness

        );

        const forward = this.target.root.forward.clone();

        forward.y = 0;
        forward.normalize();

        const lookTarget =
            this.target.root.position.add(
                forward.scale(8)
            );

        this.camera.setTarget(lookTarget);

    }

}