'use strict'

// TODO - move winows checks and calcs to new func
// call this function on window change
// fix resizing bug

function sliderCmp(minRange, maxRange, currentPos) {
    const range = maxRange - minRange
    var windowWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    let isDragged = false;
    const pivotLeftFactor = 58;
    const pivotEl = document.getElementById('pivot')
    const pathEl = document.getElementById('slider-path')
    const pathWidthStr = getComputedStyle(pathEl).width
    const pathWidth = pathWidthStr.slice(0, pathWidthStr.indexOf('px'))
    const margin = windowWidth - pathWidth
    setCurrentValue(currentPos)
    registerEventListeners()

    function registerEventListeners() {
        pathEl.addEventListener('click', moveSlider)
        pathEl.addEventListener('mousedown', moveSlider)
    }

    function moveSlider(ev) {
        const eventType = ev.type
        const xPos = ev.clientX
        if (isInsideSliderPath(xPos)) {

            switch (eventType) {
                case 'mousedown':
                    pivotEl.style.left = ev.clientX - pivotLeftFactor;
                    registerToDragSlider(pivotEl);
                    return
                default:
                    if (!isDragged) { UnRegisterToDragSlider() }
                    setNewPosToPivot(ev)
            }
        }
    }

    function isInsideSliderPath(xPos) {
        return xPos > margin / 2 && xPos < (windowWidth - margin / 2) ? true : false
    }
    function setNewPosToPivot(ev) {
        const xPos = ev.clientX
        if (isInsideSliderPath(xPos)) {
            pivotEl.style.left = xPos - pivotLeftFactor
            const value = (xPos - (margin / 2)) * range / pathWidth
            setCurrentValue(value)
        }
    }

    function registerToDragSlider() {
        pivotEl.addEventListener('mousemove', setNewPosToPivot)
    }

    function UnRegisterToDragSlider() {
        pivotEl.removeEventListener('mousemove', setNewPosToPivot)
    }

    function setCurrentValue(value) {
        document.getElementById('current-value').innerText = Math.round(value)
    }
}

sliderCmp(0, 100, 50)