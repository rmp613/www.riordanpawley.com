class Vector2 {
    constructor(x, y) {
        if (x instanceof Vector2 && y === undefined) {
            console.log(x);
            this.x = x.x;
            this.y = x.y;
        } else if (typeof(x) === 'number' && typeof(y) === 'number') {
            this.x = x;
            this.y = y;

        }
        this.equals = function(other) {
            return other.x === this.x && other.y === this.y;
        };
        this.times = function(other) {
            let product;
            if (other.x && other.y) {
                product = new Vector2(this.x * other.x, this.y * other.y);
            } else {
                product = new Vector2(this.x * other, this.y * other);
            }
            return product;
        }
        this.add = function(other) {
            let sum = new Vector2(this.x + other.x, this.y + other.y);
            return sum;
        }
        this.reverse = function() {
            return new Vector2(-this.x, -this.y);
        }
    }
}