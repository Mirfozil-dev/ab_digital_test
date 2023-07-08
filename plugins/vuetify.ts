import '@fortawesome/fontawesome-free/css/all.css'
import {createVuetify} from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import {aliases, fa} from 'vuetify/iconsets/fa'

export default defineNuxtPlugin?.(nuxt => {
    const vuetify = createVuetify({
        ssr: true,
        components,
        directives,
        icons: {
            defaultSet: 'fa',
            aliases,
            sets: {
                fa,
            },
        },
    })
    nuxt.vueApp.use(vuetify)
})