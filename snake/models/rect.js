class Rect {
    constructor(a, b, c, d) {
        if (a instanceof Vector2 && typeof(b) === 'number' && typeof(c) === 'number' && d instanceof Vector2) {
            this.width = b;
            this.height = c;
            this.dir = d;
            this._pos = a //new Vector2(pos.x - width / 2, pos.y + height / 2); //centered pos
        } else if (b === undefined && c === undefined && d === undefined && a instanceof Rect) {
            //if first variable is another rect
            this.width = a.width;
            this.height = a.height;
            this.dir = new Vector2(a.dir);
            this._pos = new Vector2(a.pos);
        } else if (a instanceof Vector2 && typeof(b) === 'number' && typeof(c) === 'number' && d === undefined) {
            this.pos = new Vector2(a.x, a.y); // if no dir
            this.width = b;
            this.height = c;
            this.dir = new Vector2(0, 0);
        } else console.error(typeof(a), typeof(b), typeof(c), typeof(d));

        this.collides = function(other) {
            if (other instanceof Rect) {
                if (this._pos.x < other._pos.x + other.width &&
                    this._pos.x + this.width > other._pos.x &&
                    this._pos.y < other._pos.y + other.height &&
                    this.height + this._pos.y > other._pos.y) {
                    return true;
                }
            } else if (other instanceof Vector2) {
                if (this._pos.x < other.x &&
                    this._pos.x + this.width >= other.x &&
                    this._pos.y < other.y &&
                    this._pos.y + this.height >= other.y) {
                    return true;
                }
            }
            return false;
        };
    }

    set pos(newPos) {
        if (newPos instanceof Vector2)
            this._pos = newPos;
        return this._pos;
    }

    get pos() {
        return this._pos;
    }

    get front() {
        let frontOffset = new Vector2(0, 0);
        if (this.dir.y > 0) {
            frontOffset.x = 0;
            frontOffset.y = this.height - snake.width;
        } else if (this.dir.y < 0) {
            frontOffset.x = 0;
            frontOffset.y = 0;
        } else if (this.dir.x > 0) {
            frontOffset.x = this.width - snake.width;
        } else if (this.dir.x < 0) {

        }
        return new Vector2(this._pos.x + frontOffset.x, this._pos.y + frontOffset.y);
    }

    get nextStart() {
        let frontOffset = new Vector2(0, 0);
        if (snake.dir.x > 0) {
            if (this.dir.y > 0) {
                frontOffset.x = snake.width;
                frontOffset.y = this.height - snake.width;
            } else if (this.dir.y < 0) {
                frontOffset.x = snake.width;
                frontOffset.y = 0;
            } else {
                frontOffset.x = this.width;
                frontOffset.y = 0;
            }
        } else if (snake.dir.x < 0) {
            if (this.dir.y > 0) {
                frontOffset.x = 0;
                frontOffset.y = this.height - snake.width;
            } else if (this.dir.y < 0) {
                frontOffset.x = 0;
                frontOffset.y = 0;
            } else {
                frontOffset.x = -snake.width;
                frontOffset.y = 0;
            }
        } else if (snake.dir.y < 0) {
            if (this.dir.x > 0) {
                frontOffset.x = this.width - snake.width;
                frontOffset.y = 0;
            } else if (this.dir.x < 0) {
                frontOffset.x = 0;
                frontOffset.y = 0;
            } else {
                frontOffset.x = 0;
                frontOffset.y = -snake.width;
            }
        } else if (snake.dir.y > 0) {
            if (this.dir.x > 0) {
                frontOffset.x = this.width - snake.width;
                frontOffset.y = snake.width;
            } else if (this.dir.x < 0) {
                frontOffset.x = 0;
                frontOffset.y = snake.width;
            } else {
                frontOffset.x = 0;
                frontOffset.y = this.height;
            }
        }
        const nextSectionPoint = new Vector2(this._pos.x + frontOffset.x, this._pos.y + frontOffset.y);

        return nextSectionPoint;
    }
}