class Enemy {
    constructor(a, b, c, d, e) {
        if (a instanceof Enemy && b === c === d === e === undefined) {
            this.rects = function() {
                let newRects = [];
                a.rects.forEach(function(rect) {
                    let newRect = new Rect(rect);
                    newRects.push(newRect);
                });
                return newRects;
            }
            this.dir = new Vector2(a.dir);
            this.score = a.score;
            this.speed = a.speed;
        } else if (b instanceof Vector2 && typeof(a) === typeof(c) === 'number') {
            this.speed = a;
            this.dir = b;
            this.score = c;
            this.rects = [];
        }
    }
    collides(other) {
        this.rects.forEach(function(rect) {
            other.rects.forEach(function(otherRect) {
                if (rect.collides(otherRect)) {
                    return true;
                }
            });
        });
        return false;
    }
}