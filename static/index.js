document.addEventListener("DOMContentLoaded", () => {

    const modal = document.querySelector('#modal');
    const visited = localStorage.getItem('pop');

    if (!visited) {
        console.log('first visit')
        modal.style.display = "block"
        modal.classList.add("show")
        document.getElementById("close-m").onclick = () => {
            modal.style.display = "none"
            modal.classList.remove("show")
        }
        localStorage.setItem('pop', true)
    }

    var canvas = document.querySelector('#canvas');
    const ctx = canvas.getContext('2d');
    canvas.height = window.innerHeight
    canvas.width = window.innerWidth

    document.querySelector('#reset').onclick = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height) 
    }

    document.querySelector('#ulam-form').onclick = visualize
})

function visualize(e) {
    const canvas = document.querySelector('#canvas')
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const height = canvas.height
    const width = canvas.width
    var n = document.querySelector('#n-input').value
    
    const size = Math.ceil(Math.sqrt(n))
    let numW, numH
    if (n >= 820) {
        numW = width / (size - (5 * size / n))
        numH = height / (size - (5 * size / n))
        ctx.lineWidth = 1;
    } else {
        numW = width / size - (5 * ((n - 1) / n))
        numH = height / size - (5 * ((n - 1) / n))
        ctx.lineWidth = 3;
    }
    let radius;
    n >= 10000 ? radius = (numW + numH) / 5 : radius = (numW + numH) / 7;

    let z = 0
    let j = 0
    let step = 1
    let numSteps = 1
    let x = width / 2 - numW / 2.6
    let y = height / 2 + numH / 2.6

    console.log(height, width)
    for (let i = 1; i <= n; i++) {
        let prevX = x;
        let prevY = y;

        if (isPrime(i)) {
            ctx.beginPath()
            ctx.arc(x, y, radius, 0, 2 * Math.PI, false)
            ctx.fillStyle = 'black'
            ctx.fill()
        }

        switch (z) {
            case 0:
                x += numW
                break
            case 1:
                y -= numH
                break
            case 2:
                x -= numW
                break
            case 3:
                y += numH
                break
        }

        ctx.beginPath()
        ctx.moveTo(prevX, prevY)
        ctx.lineTo(x, y)
        ctx.stroke()

        if (step % numSteps == 0) {
            z = (z + 1) % 4
            j++
            if (j % 2 == 0) {
                numSteps++
            }
        }
        step++
    }

    return false
}

function isPrime(n) {
    if (n === 1) {
        return false
    }
    // can be sqrt(n) but is computationally expensive
    for (let i = 2; i <= Math.ceil(n/2); i++) {
        if (n % i == 0) {
            return false
        }
    }
    return true
}
