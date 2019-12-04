'use strict'

// refactor and add comments


function initSlider() {
    const formEl = document.getElementById('slider-form')
    formEl.addEventListener('click', () => { event.preventDefault() })
    const minRange = +document.getElementById('min-value').value
    const maxRange = +document.getElementById('max-value').value
    sliderCmp(minRange, maxRange)
}
function sliderCmp(minRange, maxRange, currentPos = (minRange + maxRange) / 2) {
    const range = maxRange - minRange
    const pathEl = document.getElementById('slider-path')
    const pivotEl = document.getElementById('pivot')
    const pivotAbsPos = 58;
    const circle = document.getElementById('circle')
    const leftTransitionProp = pivotEl.style.transition
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
        setTimeout(() => {
            circle.classList.remove('shape-circle')
        }, 1000);
    }

    function onWindowResize() {
        setNewPosToPivot(null, currentValue)
    }

    function getPathMargins() {
        return getWindowWidth() - getPathWidth()
    }

    function getPathWidth() {
        const pathWidthStr = getComputedStyle(pathEl).width
        return +pathWidthStr.slice(0, pathWidthStr.indexOf('px'))
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
                    pivotEl.style.left = ev.clientX - pivotAbsPos;
                    registerToDragSlider(pivotEl);
                    return
                default:
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
            : getXposFromSliderValue(currentValue)
        if (isInsideSliderPath(xPos)) {
            pivotEl.style.left = xPos - pivotAbsPos
            const value = ev
                ? getSliderValueFromXpos(xPos)
                : currentValue - minRange
            setCurrentValue(value)
        }
    }
    function getXposFromSliderValue(value) {
        return ((value - minRange) / range * getPathWidth()) + (getPathMargins() / 2)
    }

    function getSliderValueFromXpos(xPos) {
        return (xPos - (getPathMargins() / 2)) * range / getPathWidth()
    }
    function registerToDragSlider() {
        pivotEl.addEventListener('mousemove', onDrag)
        window.addEventListener('mouseup', UnRegisterFromDragSlider)
    }

    function onDrag(ev) {
        pivotEl.style.transition = '' // Cancel CSS transition on drag
        setNewPosToPivot(ev)
    }

    function UnRegisterFromDragSlider() {
        window.removeEventListener('mouseup', UnRegisterFromDragSlider)
        pivotEl.removeEventListener('mousemove', onDrag)
        pivotEl.style.transition = leftTransitionProp // Re-add CSS transition on drag
    }

    function setCurrentValue(value) {
        currentValue = Math.round(value) + minRange
        document.getElementById('current-value').innerText = currentValue
    }
}
