const pkg = require('./package')

//  dotenv node module so we can access our .env variables inside nuxt.config.js
require('dotenv').config()

//  collect.js node module which let us work with collections so we can easily get the data we need from our Cockpit response
const collect = require('collect.js')

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    'highlight.js/styles/dracula.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/filters.js',
    '@plugins/vuetify'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    // Markdown Module
    '@nuxtjs/markdownit'
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },
  /*
  ** Markdown module configuration
  */ 
  markdownit: {
    injected: true
  },

  /*
  ** Generate config which let us set up parameter values for every dynamic route 
  ** in your application that will be transformed into HTML files
  */
  generate: {
    routes: async () => {
      let { data } = await axios.post(process.env.POSTS_URL,
      JSON.stringify({
        filter: { published: true },
        sort: {_created:-1},
        populate: 1
      }),
      {
        headers: { 'Content-Type': 'application/json' }
      })

      const collection = collect(data.entries)

      let tags = collection.map(post => post.tags)
      .flatten()
      .unique()
      .map(tag => {
        let payload = collection.filter(item => {
          return collect(item.tags).contains(tag)
        }).all()

        return {
          route: `category/${tag}`,
          payload: payload
        }
      }).all()

      let posts = collection.map(post => {
        return {
          route: post.title_slug,
          payload: post
        }
      }).all()

      return posts.concat(tags)
    }
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      
    }
  }
}
