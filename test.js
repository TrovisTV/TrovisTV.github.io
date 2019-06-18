let particles = [];

function setup() {
    createCanvas(600, 600);

    particles.push(new Particle(width / 2, height / 2));
}

function draw() {
    background(70);
    for (let i = 0; i < particles.length; i++) {
        particles[i].show();
        particles[i].update();
    }
}

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.history = [];
    }

    update() {
        this.x = mouseX;
        this.y = mouseY;

        let v = createVector(this.x, this.y);

        this.history.push(v);

        if (this.history.length > 100) {
            this.history.splice(0, 1);
        }
    }

    show() {
        for (let i = 0; i < this.history.length; i++) {
            let pos = this.history[i];
            let col = map(i, 0, this.history.length, 75, 200);
            fill(col);
            let d = map(i, 0, this.history.length, 1, 24);
            ellipse(pos.x, pos.y, d, d);
        }

        noStroke();
        fill(200);
        ellipse(this.x, this.y, 24, 24);
    }

}