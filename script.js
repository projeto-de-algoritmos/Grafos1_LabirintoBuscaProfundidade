// Obtém o elemento que contém o labirinto
const mazeContainer = document.getElementById("maze-container");

// Cria uma matriz para representar o labirinto
const maze = [];

// Função para criar o labirinto inicial
function createMaze() {
    for (let i = 0; i < 10; i++) {
        maze[i] = [];
        for (let j = 0; j < 10; j++) {
            // Cria uma célula do labirinto como uma div
            const cell = document.createElement("div");
            cell.className = "cell";
            maze[i][j] = cell;
            mazeContainer.appendChild(cell);
        }
    }
    // Define a classe "start" na célula de início
    maze[0][0].classList.add("start");
    // Define a classe "end" na célula de destino
    maze[9][9].classList.add("end");
}

// Chama a função para criar o labirinto
createMaze();

// Função para pintar o caminho gradualmente
function paintPathGradually(path, delay) {
    let index = 0;
    const colors = ["#FF5733", "#FF8C66", "#FFC300", "#C70039", "#900C3F", "#581845", "#00FF00", "#33FF33", "#0099CC", "#003366", "#FF00FF", "#9900CC", "#FF6600", "#FF3366", "#339933"];

    const paintInterval = setInterval(() => {
        if (index < path.length) {
            const { row, col } = path[index];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            maze[row][col].style.backgroundColor = randomColor;
            index++;
        } else {
            clearInterval(paintInterval);
        }
    }, delay);
}

// Função para resolver o labirinto usando BFS
function solveBFS() {
    const start = { row: 0, col: 0 };
    const end = { row: 9, col: 9 };

    const queue = [{ ...start, path: [] }];
    const visited = new Set();
    const delay = 100;

    const paintPath = (path) => {
        paintPathGradually(path, delay);
    };

    while (queue.length > 0) {
        const { row, col, path } = queue.shift();
        const cell = maze[row][col];

        if (row === end.row && col === end.col) {
            paintPath(path);
            return;
        }

        if (!visited.has(`${row}-${col}`)) {
            visited.add(`${row}-${col}`);
            cell.classList.add("visited");

            const neighbors = [
                { row: row - 1, col: col },
                { row: row + 1, col: col },
                { row: row, col: col - 1 },
                { row: row, col: col + 1 },
            ];

            for (const neighbor of neighbors) {
                const { row, col } = neighbor;

                if (isValid(row, col) && !visited.has(`${row}-${col}`)) {
                    queue.push({ row, col, path: [...path, { row, col }] });
                }
            }
        }
    }

    alert("Não foi encontrado um caminho!");
}

// Função para resolver o labirinto usando DFS
function solveDFS() {
    const start = { row: 0, col: 0 };
    const end = { row: 9, col: 9 };
    const visited = new Set();
    const delay = 100;

    const dfs = (row, col, path) => {
        if (!isValid(row, col) || visited.has(`${row}-${col}`)) {
            return false;
        }

        const cell = maze[row][col];
        visited.add(`${row}-${col}`);

        if (row === end.row && col === end.col) {
            paintPathGradually(path, delay);
            return true;
        }

        const neighbors = [
            { row: row - 1, col: col },
            { row: row + 1, col: col },
            { row: row, col: col - 1 },
            { row: row, col: col + 1 },
        ];

        for (const neighbor of neighbors) {
            const { row, col } = neighbor;

            if (dfs(row, col, [...path, { row, col }])) {
                return true;
            }
        }

        return false;
    };

    if (dfs(start.row, start.col, [start])) {
    } else {
        alert("Não foi encontrado um caminho!");
    }
}

// Função para verificar se uma célula é válida
function isValid(row, col) {
    return row >= 0 && col >= 0 && row < 10 && col < 10;
}

// Obtém o botão de redefinição e recarrega a página quando clicado
const resetButton = document.getElementById("reset-button");

resetButton.addEventListener("click", () => window.location.reload());
