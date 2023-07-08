export default defineNuxtConfig({
    devtools: {enabled: true},
    modules: [
        '@pinia/nuxt',
    ],
    imports: {
        dirs: ['stores']
    },
    pinia: {
        autoImports: [
            'defineStore',
            ['defineStore', 'definePiniaStore'],
        ],
    },
    css: [
        'vuetify/styles/main.sass'
    ],
    build: {
        transpile: ['vuetify']
    },
})
