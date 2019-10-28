<template>
  <section>
    <div class="my-5 posts container">
      <ul>
        <li class="my-5" v-for="(post, key) in posts" :key="key">
          
          <!-- CMS Tag Field -->
          <div>
            <a class="mx-1 pa-1 overline grey lighten-2"
                style="border-radius : 4px; color : #448AFF; text-decoration: none" 
                v-for="tag in post.tags" 
                :key="tag" 
                :href="'/category/'+tag">
                  #{{ tag }}
            </a>
          </div>

          <!-- CMS Title Field -->
          <div class="my-2 headline font-weight-regular">
            <a class="teal--text"
                style="text-decoration: none"
                :href="'/'+post.title_slug">
                  {{ post.title }}
            </a>
            <span class="overline"
                  style="color : #E0E0E0">
              Published - {{ post.published }}
            </span>
          </div>

          <!-- CMS Image Field -->
          <div>
            <img :src="image_base_URL+post.image.path" alt="" width="100%"/>
          </div>

          <!-- CMS Excerpt Field -->
          <div class="subtitle-2 font-weight-regular"
               style="" 
                v-html="post.excerpt">
          </div>

          <!-- CMS Title Slug Field -->
          <div class="my-3 caption font-weight-regular">                    
            <a style="color : #448AFF; text-decoration: none"
                :href="'/'+post.title_slug">
                  Read more
            </a>
          </div>          
        
        </li>
      </ul>      
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex"

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
  computed :{
    ...mapState(["posts"])
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
  }
  
}
</script>

<style scoped>

</style>