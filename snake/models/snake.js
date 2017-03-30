class Snake {
    constructor(a, b, c) {
        if (a instanceof Vector2 && typeof(b) === 'number' && typeof(c) === 'number') {
            this.dir = new Vector2(a.x, a.y);
            this.oldDir = this.dir;
            this.speed = b;
            this.width = c;
            this.rects = [];
        } else if (a instanceof Snake && b === undefined && c === undefined) {
            console.log(a);
            this.dir = new Vector2(a.dir.x, a.dir.y);
            this.oldDir = this.dir;
            this.speed = a.speed;
            this.width = a.width;
            this.rects = a.rects;
        }
        this.front = function() {
            return this.rects[this.rects.length - 1];
        };
        this.back = function() {
            return this.rects[0];
        };
        this.collides = function(other) { // IF CHECKING AGAINST INSTANCE OF SNAKE OR ENEMY ONLY CHECK THIS.FRONT AGAINST ALL THEIR SECTIONS
            if (other instanceof Snake || other instanceof Enemy) {
                other.rects.forEach(function(rect) {
                    if (this.front().collides(rect)) {
                        return true;
                    }
                });
            } else if (other instanceof Rect) {
                this.rects.forEach(function(rect) {
                    if (other.collides(rect)) {
                        return true;
                    }
                });
            }
        };
    }
}