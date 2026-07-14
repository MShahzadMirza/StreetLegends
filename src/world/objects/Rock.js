/*
=====================================
Street Legends
Rock
=====================================
*/

class Rock {

    constructor(scene, x, z) {

        const rock = BABYLON.MeshBuilder.CreateSphere(
            "rock",
            {
                diameter: Config.ROCK.SIZE
            },
            scene
        );

        rock.position.set(
            x,
            0.5,
            z
        );

        rock.scaling.y = 0.6;

        const material = new BABYLON.StandardMaterial("rockMat", scene);

        material.diffuseColor = new BABYLON.Color3(
            0.5,
            0.5,
            0.5
        );

        rock.material = material;

    }

}