document.addEventListener("DOMContentLoaded", () => {

    var canvas = document.querySelector('#canvas');
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    document.querySelector('#reset').onclick = () => {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height); 
    }

    document.querySelector('#vis').onclick = visualize;

    document.addEventListener('resize', () => {
        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth;
        console.log(canvas.height, canvas.width);
    })
})

function visualize() {
    const canvas = document.querySelector('#canvas')
    const ctx = canvas.getContext('2d');

    const height = canvas.height;
    const width = canvas.width;
    var n = document.querySelector('#n-input').value;
    
    const size = Math.ceil(Math.sqrt(n));
    const numW = width / size;
    const numH = height / size;

    console.log(size, numH, numW);

    let z = 0;
    let j = 0;
    let step = 1;
    let numSteps = 1;
    let x = width / 2;
    let y = height / 2;
    console.log(x, y);

    for (let i = 1; i <= n; i++) {
        let prevX, prevY = x, y;
        switch (z) {
            case 0:
                x += numW;
                break;
            case 1:
                y += numH;
                break;
            case 2:
                x -= numW;
                break;
            case 3:
                y -= numH;
                break;
        }

        if (isPrime(i)) {
            ctx.beginPath();
            ctx.arc(x, y, 10, 0, 2 * Math.PI, false);
            ctx.fillStyle = 'white';
            ctx.fill();
        }
        else {
            ctx.beginPath();
            ctx.moveTo(prevX, prevY);
            ctx.lineTo(x, y);
            ctx.stroke();     
        }

        if (step % numSteps == 0) {
            z = (z + 1) % 4;
            j++;
            if (j % 2 == 0) {
                numSteps++;
            }
        }
        step++;
    }

    return false;
}

function isPrime(n) {
    if (n === 1) {
        return false;
    }
    // can be sqrt(n) but is computationally expensive
    for (let i = 2; i <= Math.ceil(n/2); i++) {
        if (n % i == 0) {
            return false;
        }
    }
    return true;
}
