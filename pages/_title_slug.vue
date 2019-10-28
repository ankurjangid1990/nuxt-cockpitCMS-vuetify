<template>
  <section class="my-5 title_pages container">
    <article>

      <!-- Page Tag -->
      <div>
        <a class="mx-1 pa-1 overline grey lighten-2"
            style="border-radius : 4px; color : #448AFF; text-decoration: none"
            v-for="(tag, key) in post.tags" 
            :key="key" 
            :href="'/category/'+tag">
              #{{ tag }}
        </a>
      </div>

      <!-- Page Title -->
      <div class="my-2 headline font-weight-regular teal--text">
          {{ post.title }}
      </div>

      <!-- Page Layout Content -->
      <div v-if="post.content != null && post.content != ''"
            class="subtitle-2 font-weight-regular"
            style=""
            v-html="$options.filters.parseMd('\n' + post.content)">
      </div>      

      <!-- CMS Image Chooser Field -->
      <div>
        <div v-if="post.imagechooser != '' && post.imagechooser != null"
               class="my-2">
          <img :src="post.imagechooser.path" alt="" width="100%"/>
        </div>
      </div>

      <!-- CMS Gallery Field -->
      <div v-if="post.gallery != null && post.gallery != ''">
        <v-row align="center" justify="center">
          <v-col lg="3" md="3" v-for="gallery in post.gallery" :key="gallery">
            <img :src="cms_URL+gallery.path" alt="" width="100%"/>
          </v-col>
        </v-row>
      </div>

      <!-- CMS Collecton-Link Field -->
      <div>
        <div  class="my-2" v-if="post.collectionlink != null && post.collectionlink != ''">
          {{ post.collectionlink }}
        </div>
      </div>

      <!-- CMS File/Document Field  -->
      <div class="">
        <div class="my-5 pa-2"
              style="border : solid #448AFF 2px ; border-radius : 4px "
              v-if="post.file != null && post.file != ''">              
          <div class="grey--text">
            Documents/PDF
          </div>              
          <a class="body-2 font-italic font-weight-light"
              :href="image_base_URL+post.file.path">
                {{ post.file.title }}
          </a>
        </div> 
      </div>      

      <!-- CMS File Chooser Field -->
      <div>
        <div class="my-5" v-if="post.filechooser != '' && post.filechooser != null">
          <span class="grey--text">            
            File/PDF choosed -
          </span>
          <a class="body-2 font-italic font-weight-light"
              :href="cms_URL+'/'+post.filechooser">
                {{ post.filechooser }}
          </a>
        </div>
      </div>

      <!-- CMS Color Field -->
      <div class="">
        <div class="my-5 pa-2"
              style="border : solid #448AFF 2px ; border-radius : 4px "
              v-if="post.colorpicker != null && post.colorpicker != ''"
              :style="{ 'background-color' : post.colorpicker}">
          <div class="grey--text">
            Color Picker - {{ post.colorpicker }}
          </div>
        </div>
      </div>

      <!-- CMS ColorTag Field -->
      <div class="">
        <div class="my-5 pa-2"
              style="border : solid #448AFF 2px ; border-radius : 4px "
              v-if="post.colortag != null && post.colortag != ''"
              :style="{ 'background-color' : post.colortag}">
          <div class="grey--text">
            Color Tag - {{ post.colortag }}
          </div>
        </div>
      </div>

      <!-- CMS Date/Time Field -->
      <div>
        <div class="my-5" v-if="post.date != '' && post.date != null && post.time != '' && post.time != null">
          Date - {{ post.date }} : Time - {{ post.time }}
        </div>
      </div>

      <!-- CMS HTML Field -->
      <div>
        <div class="my-5" v-if="post.html != '' && post.html != null">
          <div v-html="$options.filters.parseMd(post.html)"></div>
        </div>
      </div>

      <!-- CMS Layout Grid -->
      <!-- col - {{ post.grid.length }} -->
      <div :gridLength="get_gridLength(post.grid.length)">
        <div v-if="gridLength === 2 || gridLength === 3 || gridLength === 4">            
          <div v-if="gridLength === 2"><div :col_value="get_col_value(6)"></div></div>
          <div v-if="gridLength === 3"><div :col_value="get_col_value(4)"></div></div>
          <div v-if="gridLength === 4"><div :col_value="get_col_value(3)"></div></div>
        </div>
        <div v-else :col_value="12">
        </div>
          <v-row align="center" justify="center">
            <v-col cols="12" :lg="col_value" :md="col_value" 
                  v-for="(gridObject, key) in post.grid" 
                  :key="key">
              <div v-for="(gridComponent, key) in gridObject.children" 
                  :key="key" 
                  :gridType="get_gridType(gridComponent.component)">
                  <div v-if="gridType === 'text'">                      
                    <div v-html="$options.filters.parseMd(gridComponent.settings.text)"></div>
                  </div>
                  <div v-if="gridType === 'html'">
                    <div v-html="$options.filters.parseMd(gridComponent.settings.html)"></div>
                  </div>
                  <div v-if="gridType === 'heading'" :headingTag="get_headingTag(gridComponent.settings.tag)">                    
                    <div v-if="headingTag === 'h1'"><h1>{{ gridComponent.settings.text }}</h1></div>
                    <div v-if="headingTag === 'h2'"><h2>{{ gridComponent.settings.text }}</h2></div>
                    <div v-if="headingTag === 'h3'"><h3>{{ gridComponent.settings.text }}</h3></div>
                    <div v-if="headingTag === 'h4'"><h4>{{ gridComponent.settings.text }}</h4></div>
                    <div v-if="headingTag === 'h5'"><h5>{{ gridComponent.settings.text }}</h5></div>
                    <div v-if="headingTag === 'h6'"><h6>{{ gridComponent.settings.text }}</h6></div>
                    <div v-else-if="headingTag === null">{{ gridComponent.settings.text }}</div>
                  </div>
                  <div class="my-2" v-if="gridType === 'divider'" 
                            :divider_id="get_dividerID(gridComponent.settings.id)"
                            :divider_class="get_dividerClass(gridComponent.settings.class)"
                            :divider_style="get_dividerStyle(gridComponent.settings.style)">
                    <v-divider :class="divider.divider_class" :id="divider.divider_id" :style="divider.divider_style">
                    </v-divider>
                  </div>
                  <div v-if="gridType === 'button'"
                            :button_url="get_buttonURL(gridComponent.settings.url)">
                    <a :href="button.button_url">                      
                      <v-btn class="primary">{{ gridComponent.settings.text }}</v-btn>
                    </a>
                  </div>
                  <div v-if="gridType === 'image'">
                    <img :src="cms_URL+gridComponent.settings.image.path" alt="" width="90%"/>
                  </div>
                  <div v-if="gridType === 'gallery'">
                    <v-row align="center" justify="center">
                      <v-col lg="3" md="3" v-for="gallery in gridComponent.settings.gallery" :key="gallery">
                        <img :src="cms_URL+gallery.path" alt="" width="100%"/>
                      </v-col>
                    </v-row>
                  </div>
                  <div v-if="gridType === 'section'" :root="get_grid(gridComponent)">
                    <RecursionGrid :node="root" />
                  </div>
                  <div v-if="gridType === 'grid'" :root="get_grid(gridComponent)">
                    <RecursionGrid :node="root" />
                  </div>
              </div>                    
            </v-col>
          </v-row>
        </div>        

    </article>
  </section>
</template>

<script>
import RecursionGrid from "../components/RecursionGrid"

export default {
  data () {
    return {
      image_base_URL : this.$store.state.image_base_url,
      cms_URL : this.$store.state.url,
      gridType : '',
      gridLength : 0,
      col_value : 12,
      headingTag : '',
      divider : {
        divider_id : '',
        divider_class : '',
        divider_style : ''
      },
      button : {
        button_url : ''
      },
      root : {}
    }
  },
  components : {
    RecursionGrid
  },
  methods : {
    get_gridType(type) {
      return this.gridType = type
    },
    get_gridLength(length) {
      return this.gridLength = length
    },
    get_col_value(value) {
      return this.col_value = value
    },
    get_headingTag(tag) {
      return this.headingTag = tag
    },
    get_dividerID(divider_id) {
      return this.divider.divider_id = divider_id      
    },
    get_dividerClass(divider_class) {      
      return this.divider.divider_class = divider_class
    },
    get_dividerStyle(divider_style) {
      return this.divider.divider_style = divider_style
    },
    get_buttonURL(url) {
      return this.button.button_url = url
    },
    get_grid(object) {
      return this.root = object
    }
  },
  async asyncData ({ app, params, error, payload }) {
    if (payload) {
      return { post: payload }
    } else {
      let { data } = await app.$axios.post(process.env.POSTS_URL,
      JSON.stringify({
          filter: { published: true, title_slug: params.title_slug },
          sort: {_created:-1},
          populate: 1
        }),
      {
        headers: { 'Content-Type': 'application/json' }
      })

      if (!data.entries[0]) {
        return error({ message: '404 Page not found', statusCode: 404 })
      }

      return { post: data.entries[0] }
    }
  }
}
</script>