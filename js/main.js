const version = 'v. 0.0.2';
document.getElementById('version').innerHTML = version;

let fpsLimit = 60;
let frameTimeLimit = Math.floor(1000/fpsLimit); // in ms

// [x; y]
function getRandomInt(floorInt,ceilInt) {
    return Math.floor(Math.random()*(ceilInt+1)) + floorInt;
}


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
};



class Marking {

    constructor(x, y, markInterval, parentReference, markHeight) {
        this.x = x;
        this.y = y;
        this.markInterval = markInterval;
        this.markHeight = markHeight;

        this.parentReference = parentReference;
        this.markReference = document.createElement('div');
        this.markReference.className = 'mark';
        this.markReference.style.height = String(Math.round(markHeight))+'px'
        this.markReference.style.left = String(this.x)+'px';
        this.markReference.style.bottom = String(this.y)+'px';
        this.parentReference.append(this.markReference);
    }

    isVisible(highestMark) {
        console.log(window.innerHeight - highestMark);
        console.log(this.markInterval);
        if (this.y< -this.markHeight &&(window.innerHeight - highestMark) >= this.markInterval) {
            this.y = window.innerHeight;
            this.markReference.style.bottom = String(this.y)+'px';
        };
    }

    moveSelf(diff) {
        this.y = this.y - diff;
        this.markReference.style.bottom = String(this.y)+'px';
    }
};








class Frames {
    constructor() {
        this.started = false;
        this.gameSpeed = 10;
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

        // other objects
        this.movableMarking = []
        this.others = []

        // Objects Generation
        this.roadLineRef = document.getElementsByClassName('static')[0];
        let y = 0;
        let markingInterval = 10; // in vh
        let markWidth = 2; // in vh
        let markHeight = 20; // in vh
        while (y<window.innerHeight) {
            this.movableMarking.push(new Marking(
                window.innerWidth * 0.5 - 0.5 * markWidth/100 * window.innerHeight, y, 
                markingInterval*window.innerHeight/100, this.roadLineRef, markHeight));  
            y+=markingInterval*window.innerHeight/100;
        };

    }

    createMarking() {

    }


    frame() {
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

        let highestMark = this.movableMarking[0].y;
        for (let i = 1; i < this.movableMarking.length; i++) {
            highestMark = Math.max(this.movableMarking[i].y, highestMark);
        }

        for (let i = 0; i < this.movableMarking.length; i++) {
            this.movableMarking[i].moveSelf(this.gameSpeed);
            this.movableMarking[i].isVisible(highestMark);
        }


    }
    startFraming() {
        this.gameFrameInterval = setInterval(this.frame.bind(this), frameTimeLimit);
    }
}

let frames = new Frames();
