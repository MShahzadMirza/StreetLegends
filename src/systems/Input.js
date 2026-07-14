/*
=====================================
Street Legends
Input Manager
=====================================
*/

class Input {

    constructor() {

        this.forward = false;
        this.backward = false;
        this.left = false;
        this.right = false;

        this.initialize();

        console.log("✅ Input Ready");

    }

    initialize() {

        window.addEventListener("keydown", (event) => {

            switch (event.key.toLowerCase()) {

                case "w":
                case "arrowup":
                    this.forward = true;
                    break;

                case "s":
                case "arrowdown":
                    this.backward = true;
                    break;

                case "a":
                case "arrowleft":
                    this.left = true;
                    break;

                case "d":
                case "arrowright":
                    this.right = true;
                    break;

            }

        });

        window.addEventListener("keyup", (event) => {

            switch (event.key.toLowerCase()) {

                case "w":
                case "arrowup":
                    this.forward = false;
                    break;

                case "s":
                case "arrowdown":
                    this.backward = false;
                    break;

                case "a":
                case "arrowleft":
                    this.left = false;
                    break;

                case "d":
                case "arrowright":
                    this.right = false;
                    break;

            }

        });

    }

}