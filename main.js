// ゲーム状態管理
const GameState = {
    TITLE: 'title',
    PLAYING: 'playing',
    RESULT: 'result'
};

// ゲーム設定
const config = {
    canvas: {
        width: 800,
        height: 600
    },
    paddle: {
        width: 100,
        height: 15,
        speed: 8,
        color: '#4ECDC4'
    },
    ball: {
        radius: 8,
        speed: 5,
        color: '#FFE66D'
    },
    brick: {
        rows: 5,
        cols: 8,
        width: 90,
        height: 30,
        padding: 10,
        offsetTop: 60,
        offsetLeft: 35,
        colors: ['#FF6B6B', '#FFA500', '#FFD93D', '#6BCF7F', '#4D96FF']
    },
    lives: 3
};

// グローバル変数
let canvas, ctx;
let currentState = GameState.TITLE;
let score = 0;
let lives = config.lives;
let paddle, ball, bricks = [];
let keys = {};
let mouseX = 0;
let touchX = null;

// パドルクラス
class Paddle {
    constructor() {
        this.width = config.paddle.width;
        this.height = config.paddle.height;
        this.x = (config.canvas.width - this.width) / 2;
        this.y = config.canvas.height - 40;
        this.speed = config.paddle.speed;
    }

    draw() {
        ctx.fillStyle = config.paddle.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = config.paddle.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.shadowBlur = 0;
    }

    moveLeft() {
        this.x = Math.max(0, this.x - this.speed);
    }

    moveRight() {
        this.x = Math.min(config.canvas.width - this.width, this.x + this.speed);
    }

    update() {
        // キーボード操作
        if (keys['ArrowLeft']) {
            this.moveLeft();
        }
        if (keys['ArrowRight']) {
            this.moveRight();
        }

        // マウス操作
        if (mouseX > 0) {
            this.x = mouseX - this.width / 2;
            this.x = Math.max(0, Math.min(config.canvas.width - this.width, this.x));
        }

        // タッチ操作
        if (touchX !== null) {
            this.x = touchX - this.width / 2;
            this.x = Math.max(0, Math.min(config.canvas.width - this.width, this.x));
        }
    }
}

// ボールクラス
class Ball {
    constructor() {
        this.radius = config.ball.radius;
        this.x = config.canvas.width / 2;
        this.y = config.canvas.height - 60;
        this.dx = config.ball.speed * (Math.random() > 0.5 ? 1 : -1);
        this.dy = -config.ball.speed;
    }

    draw() {
        ctx.fillStyle = config.ball.color;
        ctx.shadowBlur = 15;
        ctx.shadowColor = config.ball.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
    }

    update() {
        this.x += this.dx;
        this.y += this.dy;

        // 壁との衝突
        if (this.x + this.radius > config.canvas.width || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y - this.radius < 0) {
            this.dy = -this.dy;
        }

        // 画面下に落ちた
        if (this.y + this.radius > config.canvas.height) {
            lives--;
            updateLives();
            if (lives > 0) {
                this.reset();
            } else {
                gameOver();
            }
        }

        // パドルとの衝突
        if (this.y + this.radius > paddle.y &&
            this.y - this.radius < paddle.y + paddle.height &&
            this.x > paddle.x &&
            this.x < paddle.x + paddle.width) {
            
            // パドルのどこに当たったかで角度を変える
            let hitPos = (this.x - paddle.x) / paddle.width;
            let angle = (hitPos - 0.5) * Math.PI / 3; // -60度から+60度
            let speed = Math.sqrt(this.dx * this.dx + this.dy * this.dy);
            this.dx = speed * Math.sin(angle);
            this.dy = -Math.abs(speed * Math.cos(angle));
        }

        // ブロックとの衝突
        for (let brick of bricks) {
            if (brick.status === 1) {
                if (this.x > brick.x &&
                    this.x < brick.x + config.brick.width &&
                    this.y > brick.y &&
                    this.y < brick.y + config.brick.height) {
                    
                    this.dy = -this.dy;
                    brick.status = 0;
                    score += 10;
                    updateScore();

                    // すべてのブロックを破壊したかチェック
                    if (bricks.every(b => b.status === 0)) {
                        gameClear();
                    }
                }
            }
        }
    }

    reset() {
        this.x = config.canvas.width / 2;
        this.y = config.canvas.height - 60;
        this.dx = config.ball.speed * (Math.random() > 0.5 ? 1 : -1);
        this.dy = -config.ball.speed;
    }
}

// ブロッククラス
class Brick {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.width = config.brick.width;
        this.height = config.brick.height;
        this.color = color;
        this.status = 1; // 1: 存在, 0: 破壊済み
    }

    draw() {
        if (this.status === 1) {
            ctx.fillStyle = this.color;
            ctx.shadowBlur = 5;
            ctx.shadowColor = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
            ctx.strokeStyle = '#1a1a2e';
            ctx.lineWidth = 2;
            ctx.strokeRect(this.x, this.y, this.width, this.height);
            ctx.shadowBlur = 0;
        }
    }
}

// ブロック初期化
function initBricks() {
    bricks = [];
    for (let row = 0; row < config.brick.rows; row++) {
        for (let col = 0; col < config.brick.cols; col++) {
            let x = col * (config.brick.width + config.brick.padding) + config.brick.offsetLeft;
            let y = row * (config.brick.height + config.brick.padding) + config.brick.offsetTop;
            let color = config.brick.colors[row % config.brick.colors.length];
            bricks.push(new Brick(x, y, color));
        }
    }
}

// ゲーム初期化
function initGame() {
    score = 0;
    lives = config.lives;
    paddle = new Paddle();
    ball = new Ball();
    initBricks();
    updateScore();
    updateLives();
    
    // 初回描画を確実に実行
    draw();
}

// スコア更新
function updateScore() {
    document.getElementById('score').textContent = score;
}

// 残機更新
function updateLives() {
    document.getElementById('lives').textContent = lives;
}

// ゲームクリア
function gameClear() {
    currentState = GameState.RESULT;
    document.getElementById('result-title').textContent = '🎉 クリア!';
    document.getElementById('result-message').textContent = 'おめでとうございます!';
    document.getElementById('final-score').textContent = score;
    showScreen('result-screen');
}

// ゲームオーバー
function gameOver() {
    currentState = GameState.RESULT;
    document.getElementById('result-title').textContent = '😢 ゲームオーバー';
    document.getElementById('result-message').textContent = '残念!もう一度挑戦しよう!';
    document.getElementById('final-score').textContent = score;
    showScreen('result-screen');
}

// 画面切り替え
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.style.display = 'none';
    });
    document.getElementById(screenId).style.display = 'block';
}

// 描画
function draw() {
    // キャンバスクリア
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, config.canvas.width, config.canvas.height);

    // 描画
    paddle.draw();
    ball.draw();
    bricks.forEach(brick => brick.draw());
}

// 更新
function update() {
    if (currentState === GameState.PLAYING) {
        paddle.update();
        ball.update();
    }
}

// ゲームループ
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

// イベントリスナー
function setupEventListeners() {
    // キーボード
    document.addEventListener('keydown', (e) => {
        keys[e.key] = true;
    });

    document.addEventListener('keyup', (e) => {
        keys[e.key] = false;
    });

    // マウス
    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
    });

    canvas.addEventListener('mouseleave', () => {
        mouseX = 0;
    });

    // タッチ
    canvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
        const rect = canvas.getBoundingClientRect();
        touchX = e.touches[0].clientX - rect.left;
    });

    canvas.addEventListener('touchmove', (e) => {
        e.preventDefault();
        const rect = canvas.getBoundingClientRect();
        touchX = e.touches[0].clientX - rect.left;
    });

    canvas.addEventListener('touchend', () => {
        touchX = null;
    });

    // スタートボタン
    document.getElementById('start-button').addEventListener('click', () => {
        currentState = GameState.PLAYING;
        initGame();
        showScreen('game-screen');
    });

    // リトライボタン
    document.getElementById('retry-button').addEventListener('click', () => {
        currentState = GameState.PLAYING;
        initGame();
        showScreen('game-screen');
    });
}

// キャンバスのレスポンシブ対応
function resizeCanvas() {
    const container = document.getElementById('game-container');
    const maxWidth = Math.min(window.innerWidth * 0.9, config.canvas.width);
    const scale = maxWidth / config.canvas.width;
    
    canvas.style.width = maxWidth + 'px';
    canvas.style.height = (config.canvas.height * scale) + 'px';
}

// 初期化
window.addEventListener('DOMContentLoaded', () => {
    canvas = document.getElementById('game-canvas');
    ctx = canvas.getContext('2d');
    
    canvas.width = config.canvas.width;
    canvas.height = config.canvas.height;
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    setupEventListeners();
    
    // 初期描画（タイトル画面用）
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, config.canvas.width, config.canvas.height);
    
    gameLoop();
});
