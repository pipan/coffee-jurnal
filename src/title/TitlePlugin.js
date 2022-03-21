import { isNavigationFailure } from "vue-router"

export default {
    install: function (app) {
        if (!app.config.globalProperties.$router) {
            console.warn("TO use TitlePlugin you have to use vue-router")
            return
        }
        
        app.config.globalProperties.$router.afterEach((to, from, failure) => {
            if (isNavigationFailure(failure)) {
                return
            }
            const route = to.matched[to.matched.length - 1]
            const component = route.components.default
            if (!component.title) {
                return
            }
            document.title = component.title()
        })
    }
}