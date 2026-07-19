
/*
=====================================
Street Legends
Skid Marks
=====================================
*/

class SkidMarks {

    constructor(scene) {

        this.scene = scene;

        this.lines = [];

    }

    addMark(position, rotation) {

        const mark = BABYLON.MeshBuilder.CreateGround(
            "skid",
            {
                width: 0.22,
                height: 0.45
            },
            this.scene
        );

        mark.position.copyFrom(position);
        mark.position.y += 0.01;

        // IMPORTANT
        mark.rotation.y = rotation;

        const mat = new BABYLON.StandardMaterial(
            "skidMat",
            this.scene
        );

        mat.diffuseColor = new BABYLON.Color3(
            0.08,
            0.08,
            0.08
        );

        mat.alpha = 0.65;

        mark.material = mat;

        this.lines.push(mark);

        if (this.lines.length > 600) {

            this.lines[0].dispose();
            this.lines.shift();

        }

    }

}