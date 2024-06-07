const version = 'v. 0.0.1';
document.getElementById('version').innerHTML = version;

let fpsLimit = 60;
let frameTimeLimit = Math.floor(1000/fpsLimit); // in ms




class Car {
    constructor(carClassName, movementTweeks, upKey, rightKey, downKey, leftKey){
        this.carPageReference = document.getElementsByClassName(carClassName)[0];

        // Movement tweeks
        this.steerSpeed = movementTweeks.steerSpeed;
        this.breakSpeed = movementTweeks.breakSpeed;
        this.accelerationSpeed = movementTweeks.accelerationSpeed;

        this.x = Number(window.getComputedStyle(this.carPageReference).getPropertyValue('left').slice(0, self.length-2));
        this.y = Number(window.getComputedStyle(this.carPageReference).getPropertyValue('bottom').slice(0, self.length-2));

        this.upKey = upKey;
        this.rightKey = rightKey;
        this.downKey = downKey;
        this.leftKey = leftKey;

        this.left = false;
        this.right = false;
        this.down = false;
        this.up = false;

        document.addEventListener('keydown', (event)=>{
            event = event || window.event;
            event.preventDefault();
            if (event.key == this.leftKey){
                this.left = true;
            } else if (event.key == this.rightKey) {
                this.right = true;
            } else if (event.key == this.upKey) {
                this.up = true;
            } else if (event.key == this.downKey) {
                this.down = true;
            }
        });
        document.addEventListener('keyup', (event)=>{
            event = event || window.event;
            event.preventDefault();
            if (event.key == this.leftKey){
                this.left = false;
            } else if (event.key == this.rightKey) {
                this.right = false;
            } else if (event.key == this.upKey) {
                this.up = false;
            } else if (event.key == this.downKey) {
                this.down = false;
            }
        });
    }
}

// Car movement set up



class Frames {
    constructor() {
        this.started = false;

        document.addEventListener('click', ()=>{
            if (this.started) {
                clearInterval(this.gameFrameInterval);
                this.started = false;
                console.log('stopped');
            } else {
                this.started = true;
                this.startFraming();
                console.log('started');
            };
        });

        // Creating car object
        this.car = new Car(
            // Giving reference to HTML Class of car
            'car',

            // Movement speed
            {
                steerSpeed: 1,
                breakSpeed: 1,
                accelerationSpeed: 1,
            },
        
            // Key binds
            'ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft'
        );
    }
    // Указывать через this ?
    frame() {
        console.log(this.car.x);
        // Movement
        if (frames.car.left) {
            this.car.x = this.car.x - this.car.steerSpeed;
            this.car.carPageReference.style.left = String(this.car.x) + 'px';
        };
        if (this.car.right) {
            this.car.x = this.car.x + this.car.steerSpeed;
            this.car.carPageReference.style.left = String(this.car.x) + 'px';
        };
        if (this.car.up) {
            this.car.y = this.car.y + this.car.accelerationSpeed;
            this.car.carPageReference.style.bottom = String(this.car.y) + 'px';
        };
        if (this.car.down) {
            this.car.y = this.car.y - this.car.breakSpeed;
            this.car.carPageReference.style.bottom = String(this.car.y) + 'px';
        };
    }
    startFraming() {
        console.log(this.car);
        this.gameFrameInterval = setInterval(this.frame.bind(this), frameTimeLimit);
    }
}

let frames = new Frames();
