'use strict'

function init() {
    listenToMouseEvents()
}

function listenToMouseEvents() {
    const el = document.getElementById('slider-path')
    el.addEventListener('click', moveSlider)
}

function moveSlider(ev) {
    const pivot = document.getElementById('pivot')
    pivot.style.left = ev.clientX - 58
}