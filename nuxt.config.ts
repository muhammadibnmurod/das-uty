// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },

  components: [
    { path: "~/components", pathPrefix: false },
    { path: "~/components/ui", pathPrefix: false },
    { path: "~/components/layout", pathPrefix: false },
  ],

  modules: [
    '@element-plus/nuxt',
    'nuxt-svgo'
  ],

  elementPlus: {
    /** Options */
  },

  svgo: {
    componentPrefix: "icon",
    autoImportPath: "./assets/icons/",
    defaultImport: "component",
    svgoConfig: {
      multipass: false, // Отключаем многоходовую оптимизацию
      plugins: [
        {
          name: "preset-default",
          params: {
            overrides: {
              // Отключаем ВСЕ плагины оптимизации
              removeDoctype: false,
              removeXMLProcInst: false,
              removeComments: false,
              removeMetadata: false,
              removeEditorsNSData: false,
              cleanupIds: false,
              convertColors: false,
              convertPathData: false,
              convertTransform: false,
              removeUnknownsAndDefaults: false,
              removeNonInheritableGroupAttrs: false,
              removeUselessStrokeAndFill: false,
              removeUnusedNS: false,
              cleanupNumericValues: false,
              moveElemsAttrsToGroup: false,
              moveGroupAttrsToElems: false,
              collapseGroups: false,
              mergePaths: false,
              convertShapeToPath: false,
              sortAttrs: false,
              removeTitle: false,
              removeDesc: false,
              removeEmptyContainers: false,
              removeViewBox: false,
              cleanupEnableBackground: false,
              removeHiddenElems: false,
              removeEmptyText: false,
              inlineStyles: false,
              minifyStyles: false,
            },
          },
        },
      ],
    },
  },

  app: {
    head: {
      title: "Base-Project",
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { charset: "utf-8" },
        { name: "theme-color", content: "#ffffff" },
        { name: "description", content: "NBT - Next Big Thing" },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  // imports - autoImport
  // If you want auto-import, set to true. 
  // If you don't need it, set to false or remove this option.
  imports: {
    autoImport: true,
  },

  css: [
    "@/assets/css/global.css",
  ],

})