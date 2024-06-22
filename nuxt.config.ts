// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['@/assets/css/global.css'],
  typescript: {
    shim: false, // *.vue 파일에 대한 shim 생성을 비활성화
    typeCheck: true, // 빌드 또는 개발시 타입 검사를 활성화하기 위해
  },
  modules: ['nuxt-quasar-ui'],
  quasar: {
    cssAddon: true,
    // plugins: [],
    // sassVariables: 'css/quasar.variables.scss',
    // quietSassWarnings: true,
    // lang: 'en-US',
    // iconSet: 'material-icons',
    // config: {},
    // extras: {
    //   font: null,
    //   fontIcons: ['material-icons', 'fontawesome-v6', 'mdi-v7'],
    //   svgIcons: [],
    //   animations: [],
    // },
  },
});
