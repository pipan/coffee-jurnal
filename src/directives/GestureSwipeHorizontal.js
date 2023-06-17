const listenerMap = {}

function createGestureService(el) {
    let config = null
    
    function checkMove(sourceEvent) {
        if (config.triggered === false) {
            return
        }
        const diff = { x: config.current.x - config.start.x, y: config.current.y - config.start.y }
        if (config.triggered === undefined) {
            const vectorSize = Math.sqrt(diff.x * diff.x + diff.y * diff.y)
            if (vectorSize > 10) {
                config.triggered = Math.abs(diff.x) > Math.abs(diff.y)
                if (config.triggered === true) {
                    if (!el.classList.contains('gesture--active')) {
                        el.classList.add('gesture--active')
                    }
                    const customEvent = new CustomEvent('gestureSwipeHorizontalStart', {bubbles: true});
                    el.dispatchEvent(customEvent);
                }
            }
        }

        if (config.triggered === true) {
            sourceEvent.preventDefault()
            config.start = config.current
            let eventData = { deltaX: diff.x, deltaY: diff.y, x: config.current.x, y: config.current.y }
            const event = new CustomEvent('gestureSwipeHorizontal', {detail: eventData, bubbles: true});
            el.dispatchEvent(event);
        }
    }
    
    function touch(event) {
        event.stopPropagation()
        const x = event.touches[0].clientX
        const y = event.touches[0].clientY
        config = {
            start: { x: x, y: y },
            current: { x: x, y: y },
            triggered: undefined
        }
        document.addEventListener('touchmove', move, { passive: false })
        document.addEventListener('touchend', stop)
    }
    
    function stop() {
        document.removeEventListener('touchmove', move, { passive: false })
        document.removeEventListener('touchend', stop)
        if (config.triggered === true) {
            el.classList.remove('gesture--active')
            const customEvent = new CustomEvent('gestureSwipeHorizontalEnd', {bubbles: true});
            el.dispatchEvent(customEvent);
        }
    }

    function move(event) {
        if (!config) {
            return;
        }
        
        const x = event.clientX !== undefined ? event.clientX : event.touches[0].clientX
        const y = event.clientY !== undefined ? event.clientY : event.touches[0].clientY
        config.current = { x: x, y: y }
        checkMove(event)
    }

    return { touch }
}



export const gestureSwipeHorizontalDirective = {
    beforeMount(el) {
        const hash = Math.random().toString().substring(2)
        el.dataset.gestureHash = hash

        listenerMap[hash] = createGestureService(el)
        el.addEventListener('touchstart', listenerMap[hash].touch)
    },
    unmounted(el) {
        const hash = el.dataset.gestureHash
        el.removeEventListener('touchstart', listenerMap[hash].touch)
        delete listenerMap[hash]
    }
}