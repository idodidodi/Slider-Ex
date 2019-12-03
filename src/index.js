'use strict'

// TODO - move winows checks and calcs to new func
// call this function on window change
// fix resizing bug
// release drag if mouse going out of path X 20 px outside path y for ech side

sliderCmp(30, 70, 58)

function sliderCmp(minRange, maxRange, currentValue) {
    // debugger
    const range = maxRange - minRange
    var windowWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    const pivotLeftFactor = 58;
    const pivotEl = document.getElementById('pivot')
    const pathEl = document.getElementById('slider-path')
    const pathWidthStr = getComputedStyle(pathEl).width
    const pathWidth = pathWidthStr.slice(0, pathWidthStr.indexOf('px'))
    const margin = windowWidth - pathWidth
    setNewPosToPivot(null, currentValue)
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
                    UnRegisterToDragSlider()
                    setNewPosToPivot(ev)
            }
        }
    }

    function isInsideSliderPath(xPos) {
        return xPos > margin / 2 && xPos < (windowWidth - margin / 2) ? true : false
    }
    function setNewPosToPivot(ev, currentValue) {
        const xPos = ev
            ? ev.clientX
            : ((currentValue - minRange) / range * pathWidth) + (margin / 2)
        if (isInsideSliderPath(xPos)) {
            pivotEl.style.left = xPos - pivotLeftFactor
            const value = ev
                ? (xPos - (margin / 2)) * range / pathWidth
                : currentValue - minRange
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
        document.getElementById('current-value').innerText = Math.round(value) + minRange
    }
}
