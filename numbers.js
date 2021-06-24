
window.addEventListener("load", () => {
    canvas.height = window.innerHeight / 2
    canvas.width = window.innerWidth / 2
})

window.addEventListener("resize", () => {
    canvas.height = window.innerHeight / 2
    canvas.width = window.innerWidth / 2

}
)

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext("2d")
let drawing = false

function startPosition(e) {
    drawing = true
    draw(e)
}

function finishedPosition() {
    drawing = false
    ctx.beginPath()
}

function draw(e) {
    if (!drawing) return
    const position = getMousePos(canvas, e)
    ctx.lineWidth = 10
    ctx.lineCap = "round"

    ctx.lineTo(position.x, position.y)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(position.x, position.y)

}

function getMousePos(canvas, evt) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
}

canvas.addEventListener("mousedown", startPosition)
canvas.addEventListener("mouseup", finishedPosition)
canvas.addEventListener("mousemove", draw)