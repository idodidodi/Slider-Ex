'use strict'

// release drag if mouse going out of path X 20 px outside path y for ech side
// see in the browser on 100% and enlarge
// fix bug on release - can't release on path ends
// can press outside path to cancel but then value would set to max range

sliderCmp(30, 70, 58)

function sliderCmp(minRange, maxRange, currentPos) {
    const range = maxRange - minRange
    const pivotLeftPos = 58;
    const pivotEl = document.getElementById('pivot')
    const pathEl = document.getElementById('slider-path')
    const circle = document.getElementById('circle')
    let currentValue = currentPos

    setNewPosToPivot(null, currentValue)
    registerEventListeners()

    function registerEventListeners() {
        pathEl.addEventListener('click', moveSlider)
        pivotEl.addEventListener('mousedown', moveSlider)
        window.addEventListener('resize', onWindowResize)
        circle.addEventListener('mousedown', animateCircle)
    }

    function animateCircle() {
        circle.classList.add('shape-circle')
    }

    function onWindowResize() {
        setNewPosToPivot(null, currentValue)
    }

    function getPathMargins() {
        return getWindowWidth() - getPathWidth()
    }

    function getPathWidth() {
        const pathWidthStr = getComputedStyle(pathEl).width
        return pathWidthStr.slice(0, pathWidthStr.indexOf('px'))
    }

    function getWindowWidth() {
        return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    }

    function moveSlider(ev) {
        const eventType = ev.type
        const xPos = ev.clientX
        if (isInsideSliderPath(xPos)) {

            switch (eventType) {
                case 'mousedown':
                    animateCircle()
                    pivotEl.style.left = ev.clientX - pivotLeftPos;
                    registerToDragSlider(pivotEl);
                    return
                default:
                    UnRegisterFromDragSlider()
                    setNewPosToPivot(ev)
            }
        }
    }

    function isInsideSliderPath(xPos) {
        return xPos > getPathMargins() / 2 && xPos < (getWindowWidth() - getPathMargins() / 2) ? true : false
    }
    function setNewPosToPivot(ev, currentValue) {
        const xPos = ev
            ? ev.clientX
            : ((currentValue - minRange) / range * getPathWidth()) + (getPathMargins() / 2)
        if (isInsideSliderPath(xPos)) {
            pivotEl.style.left = xPos - pivotLeftPos
            const value = ev
                ? (xPos - (getPathMargins() / 2)) * range / getPathWidth()
                : currentValue - minRange
            setCurrentValue(value)
        }
    }

    function registerToDragSlider() {
        pivotEl.addEventListener('mousemove', onDrag)
    }

    function onDrag(ev) {
        pivotEl.style.transition = '' // Cancel CSS transition on drag
        setNewPosToPivot(ev)
    }

    function UnRegisterFromDragSlider() {
        pivotEl.removeEventListener('mousemove', onDrag)
        circle.classList.remove('shape-circle')
        pivotEl.style.transition = 'left 1s'
    }

    function setCurrentValue(value) {
        currentValue = Math.round(value) + minRange
        document.getElementById('current-value').innerText = currentValue
    }
}
