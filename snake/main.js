    const baseSnake = new Snake(new Vector2(-1, 0), 5, 5);
    let snake = new Snake(baseSnake);

    (function() {
        let baseSnakeRect;
        let buffer;
        let canvas;
        const gameStates = {
            running: 1,
            paused: 2,
            gameOver: 3
        };
        let state = gameStates.running;

        const fps = 10;
        let updateRate = 1000 / fps;
        const borderWidth = snake.width;
        const keyCode = {
            w: 87,
            a: 65,
            s: 83,
            d: 68,
            p: 80,
            r: 82
        }

        function isPaused() {
            return state === gameStates.paused ? true : false;
        }

        let debugPoints = [];
        canvas = document.getElementById("game-canvas");
        const upperBoundary = new Rect(new Vector2(0, 0), canvas.width, snake.width),
            lowerBoundary = new Rect(new Vector2(0, canvas.height - snake.width), canvas.width, snake.width),
            leftBoundary = new Rect(new Vector2(0, 0), snake.width, canvas.height),
            rightBoundary = new Rect(new Vector2(canvas.width - snake.width, 0), snake.width, canvas.height);

        window.onload = function() {
            let pos = new Vector2(canvas.width / 2, canvas.height / 2);
            let dir = new Vector2(-1, 0);
            baseSnakeRect = new Rect(pos, snake.width * 10, snake.width, dir);
            snake.rects.push(new Rect(baseSnakeRect));

            buffer = canvas.getContext('2d');

            game = setInterval(update, updateRate);

            document.addEventListener('keydown', function(e) {
                const front = snake.front();
                if (e.keyCode === keyCode.w && front.dir.y == 0) {
                    snake.dir.y = -1;
                    snake.dir.x = 0;
                } else if (e.keyCode === keyCode.a && front.dir.x == 0) {
                    snake.dir.x = -1;
                    snake.dir.y = 0;
                } else if (e.keyCode === keyCode.s && front.dir.y == 0) {
                    snake.dir.y = 1;
                    snake.dir.x = 0;
                } else if (e.keyCode === keyCode.d && front.dir.x == 0) {
                    snake.dir.x = 1;
                    snake.dir.y = 0;
                } else if (e.keyCode === keyCode.p) {
                    togglePause();
                } else if (e.keyCode === keyCode.r) {
                    // console.log('restart');
                    restart();
                }

            });
            // pause();
        }

        function restart() {
            snake = {};
            snake = new Snake(baseSnake);
            snake.rects = [];
            snake.rects.push(new Rect(baseSnakeRect));
            if (state !== gameStates.running)
                resume();
        }

        function togglePause() {
            if (state === gameStates.paused) {
                resume();
            } else if (state === gameStates.running) {
                pause();
            }
        }

        function resume() {
            state = gameStates.running;
            game = setInterval(update, updateRate);
        }

        function pause() {
            state = gameStates.paused;
            clearInterval(game);
        }

        function gameOver() {
            console.log("gameOver");
            state = gameStates.gameOver;
            clearInterval(game);
        }

        function update() {
            if (!snake.oldDir.equals(snake.dir)) {
                const width = Math.abs(snake.dir.y) * snake.width;
                const height = Math.abs(snake.dir.x) * snake.width;
                let front = snake.front();
                let startPos = new Vector2(front.nextStart.x, front.nextStart.y);
                let startDir = new Vector2(snake.dir.x, snake.dir.y);
                snake.rects.push(new Rect(startPos, width, height, new Vector2(snake.dir.x, snake.dir.y)));
            }
            moveSnake();

            // ***************** RENDERING ***************
            buffer.fillStyle = 'white';
            buffer.fillRect(0, 0, canvas.width, canvas.height);
            buffer.fillStyle = 'red';
            buffer.fillRect(upperBoundary.pos.x, upperBoundary.pos.y, upperBoundary.width, upperBoundary.height);
            buffer.fillRect(lowerBoundary.pos.x, lowerBoundary.pos.y, lowerBoundary.width, lowerBoundary.height);
            buffer.fillRect(rightBoundary.pos.x, rightBoundary.pos.y, rightBoundary.width, rightBoundary.height);
            buffer.fillRect(leftBoundary.pos.x, leftBoundary.pos.y, leftBoundary.width, leftBoundary.height);

            snake.rects.forEach(function(rect) {
                buffer.fillStyle = 'black';
                buffer.fillRect(rect.pos.x, rect.pos.y, rect.width, rect.height);
            });

            debugPoints.forEach(function(point) {
                if (point instanceof Vector2) {
                    buffer.fillStyle = 'red';
                    buffer.fillRect(point.x, point.y, 1, 1);
                }
            })
            if (checkSelfCollisions()) {
                gameOver();
                return;
            }
            snake.oldDir = new Vector2(snake.dir.x, snake.dir.y);
        }

        function checkMapCollisions(nextSectionPoint) {
            const mapWidth = canvas.width - borderWidth * 2;
            const mapHeight = canvas.height - borderWidth * 2;
            let midNextSectionPoint = new Vector2(nextSectionPoint.x + snake.width / 2, nextSectionPoint.y + snake.width / 2);
            if (upperBoundary.collides(midNextSectionPoint)) {
                return new Vector2(nextSectionPoint.x, nextSectionPoint.y + mapHeight + snake.width);
            } else if (lowerBoundary.collides(midNextSectionPoint)) {
                return new Vector2(nextSectionPoint.x, nextSectionPoint.y - mapHeight);
            } else if (rightBoundary.collides(midNextSectionPoint)) {
                return new Vector2(nextSectionPoint.x - mapWidth, nextSectionPoint.y);
            } else if (leftBoundary.collides(midNextSectionPoint)) {
                return new Vector2(nextSectionPoint.x + mapWidth + snake.width, nextSectionPoint.y);
            }

            return null;
        }

        function checkSelfCollisions() {
            const front = snake.front().front;
            const midCurrentPoint = new Vector2(front.x + snake.width / 2, front.y + snake.width / 2);
            // debugPoints.push(midCurrentPoint);
            for (let i = 0; i < snake.rects.length - 1; i++) {
                const snakeSection = snake.rects[i];
                if (snakeSection.collides(new Vector2(midCurrentPoint.x, midCurrentPoint.y))) {
                    return true;
                }
            }
            return false;
        }

        function checkEnemyCollisions() {
            const front = snake.front().front;
            const midCurrentPoint = new Vector2(front.x + snake.width / 2, front.y + snake.width / 2);

            for (let i = 0; i < enemys.length; i++) {}
        }

        function moveSnake() {
            let nextSectionPoint = new Vector2(snake.front().nextStart.x, snake.front().nextStart.y);
            const nextSection = new Rect(nextSectionPoint, snake.width, snake.width, new Vector2(0, 0));

            const mapCollision = checkMapCollisions(nextSectionPoint);
            if (mapCollision != null) {
                const width = Math.abs(snake.dir.y) * snake.width;
                const height = Math.abs(snake.dir.x) * snake.width;
                let startDir = new Vector2(snake.dir.x, snake.dir.y);
                snake.rects.push(new Rect(mapCollision, width, height, new Vector2(snake.dir.x, snake.dir.y)));
            }

            if (snake.rects.length === 1) {
                // snake.front().pos.x += snake.dir.x * snake.speed;
                snake.front().pos = new Vector2(snake.front().pos.x + snake.dir.x * snake.speed, snake.front().pos.y + snake.dir.y * snake.speed);
                //  snake.front().pos.y += snake.dir.y * snake.speed;
                // snake.front().pos = new Vector2(snake.front().pos.x, snake.front().pos.y + snake.dir.y * snake.speed);
            } else {
                if (snake.back().width === 0 || snake.back().height === 0) {
                    snake.rects.shift();
                }


                const front = snake.front();
                if (front.dir.x > 0) {
                    front.width += snake.speed;
                } else if (front.dir.x < 0) {
                    front.pos.x -= snake.speed;
                    front.width += snake.speed;
                } else if (front.dir.y < 0) {
                    front.pos.y -= snake.speed;
                    front.height += snake.speed;
                } else if (front.dir.y > 0) {
                    front.height += snake.speed;
                }

                const back = snake.back();
                if (back.dir.x > 0) {
                    back.pos.x += snake.speed;
                    back.width -= snake.speed;
                } else if (back.dir.x < 0) {
                    back.width -= snake.speed;
                } else if (back.dir.y < 0) {
                    back.height -= snake.speed;
                } else if (back.dir.y > 0) {
                    back.pos.y += snake.speed;
                    back.height -= snake.speed;
                }

            }
        }
    })();