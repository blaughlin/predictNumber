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
let model

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
    ctx.strokeStyle = "white";
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

async function loadModel() {
    model = undefined
    model = await tf.loadLayersModel("models/model.json")
}

loadModel()

function preprocessImage(image){
    let tensor = tf.browser.fromPixels(image)
        .resizeNearestNeighbor([28,28])
        .mean(2)
        .expandDims(2)
        .expandDims()
        .toFloat()
    return tensor.div(255.0)
}

canvas.addEventListener("mousedown", startPosition)
canvas.addEventListener("mouseup", finishedPosition)
canvas.addEventListener("mousemove", draw)

const clearBtn = document.getElementById('clearBtn')
const predictBtn = document.getElementById('predictBtn')
clearBtn.addEventListener('click', () => ctx.clearRect(0, 0, canvas.width, canvas.height))
predictBtn.addEventListener('click', async () => {
    // const imageData = canvas.toDataURL()
    
    let tensor = preprocessImage(canvas)

    let predictions = await model.predict(tensor).data();

    let results = Array.from(predictions)

    index = results.indexOf(Math.max(...results))
    console.log(`Prediction is ${index}`)
})