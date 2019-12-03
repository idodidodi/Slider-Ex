'use strict'

function sliderCmp(minRange, maxRange, currentPos) {
    let isDragged = false;
    const leftMargin = 58;
    const pivotEl = document.getElementById('pivot')
    setCurrentValue(currentPos)
    registerEventListeners()

    function registerEventListeners() {
        const pathEl = document.getElementById('slider-path')
        pathEl.addEventListener('click', moveSlider)
        pathEl.addEventListener('mousedown', moveSlider)
        // pathEl.addEventListener('mouseup', moveSlider)
    }

    function moveSlider(ev) {
        console.log('should see you many times while dragging')
        const eventType = ev.type
        if (ev.clientX > 30) {

            switch (eventType) {
                // case 'mouseup':
                //     console.log('mouse up', ev.offsetY)
                // return
                case 'mousedown':
                    pivotEl.style.left = ev.clientX - leftMargin;
                    registerToDragSlider(pivotEl);
                    console.log('should see you once while dragging')
                    return
                default:
                    if (!isDragged) { UnRegisterToDragSlider() }
                    pivotEl.style.left = ev.clientX - leftMargin
            }
        }
        // TODO add clientX < ....
    }

    function setNewPosToPivot(ev) {
        const xPos = ev.clientX
        if (xPos > 36) {
            pivotEl.style.left = xPos - leftMargin
        }
    }

    function registerToDragSlider() {
        pivotEl.addEventListener('mousemove', setNewPosToPivot)
    }

    function UnRegisterToDragSlider() {
        pivotEl.removeEventListener('mousemove', setNewPosToPivot)
    }

    function setCurrentValue(value) {
        document.getElementById('current-value').innerText = value
    }
}

sliderCmp(0, 100, 50)