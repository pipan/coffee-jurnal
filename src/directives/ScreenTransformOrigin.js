const listenerMap = {}

export default {
    bind: function (element, binding) {
        const hash = Math.random().toString().substring(2)
        element.dataset.ScreeTransformOriginId = hash

        listenerMap[hash] = (event) => {
            const scrollTop = event.target.scrollingElement.scrollTop
            const value = binding.value.replace("{SCROLL_Y}", scrollTop)
            element.style.transformOrigin = value
        }
        window.addEventListener('scroll', listenerMap[hash])
    },
    unbind: function (element) {
        const hash = element.dataset.ScreeTransformOriginId
        window.removeEventListener('scroll', listenerMap[hash])
        delete listenerMap[hash]
    }
}