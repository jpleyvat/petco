export default {
  components: true,
  css: ["~/assets/styles/styles.css"],
  plugins: [{ src: "~/plugins/intersection-observer", ssr: false }],
  modules: ["@nuxtjs/axios"],
  axios: {
    // proxy: true
  },
};
