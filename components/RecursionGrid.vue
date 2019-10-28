<template>
    <div>   
        <div class="pa-2">
            <div v-if="Array.isArray(node.children) && node.children.length">
                <div v-for="children in node.children" :key="children.component">
                        <div>
                            <div v-if="children.component !== 'grid'">
                                <div v-if="children.component === 'text' && children.settings.text != null">
                                    <!-- {{ children.settings.text }} -->
                                  <div v-html="$options.filters.parseMd(children.settings.text)"></div>
                                </div>
                                <div v-if="children.component === 'html'">
                                    {{ children.settings.html }}
                                  <!-- <div v-html="$options.filters.parseMd(children.settings.html)"></div> -->
                                </div>
                                <div v-if="children.component === 'heading'" :headingTag="get_headingTag(children.settings.tag)">                    
                                  <div v-if="headingTag === 'h1'"><h1>{{ children.settings.text }}</h1></div>
                                  <div v-if="headingTag === 'h2'"><h2>{{ children.settings.text }}</h2></div>
                                  <div v-if="headingTag === 'h3'"><h3>{{ children.settings.text }}</h3></div>
                                  <div v-if="headingTag === 'h4'"><h4>{{ children.settings.text }}</h4></div>
                                  <div v-if="headingTag === 'h5'"><h5>{{ children.settings.text }}</h5></div>
                                  <div v-if="headingTag === 'h6'"><h6>{{ children.settings.text }}</h6></div>
                                  <div v-else-if="headingTag === null">{{ children.settings.text }}</div>
                                </div>
                                <div class="my-2" v-if="children.component === 'divider'" 
                                          :divider_id="get_dividerID(children.settings.id)"
                                          :divider_class="get_dividerClass(children.settings.class)"
                                          :divider_style="get_dividerStyle(children.settings.style)">
                                  <v-divider :class="divider.divider_class" :id="divider.divider_id" :style="divider.divider_style">
                                  </v-divider>
                                </div>
                                <div v-if="children.component === 'button'"
                                          :button_url="get_buttonURL(children.settings.url)">
                                  <a :href="button.button_url">                      
                                    <v-btn class="primary">{{ children.settings.text }}</v-btn>
                                  </a>
                                </div>
                                <div v-if="children.component === 'image' && children.settings.image != null">
                                  <img :src="cms_URL+children.settings.image.path" alt="" width="100%"/>
                                </div>
                                <div v-if="children.component === 'gallery'">
                                  <v-row align="center" justify="center">
                                    <v-col lg="3" md="3" v-for="gallery in children.settings.gallery" :key="gallery">
                                      <img :src="cms_URL+gallery.path" alt="" width="100%"/>
                                    </v-col>
                                  </v-row>
                                </div>                            
                                <div v-else-if="children.component === 'section'">
                                    <RecursionGrid :node="children" />
                                </div>
                            </div>
                            <div v-else-if="children.component === 'grid'">                                
                                <RecursionGrid :node="children" /> 
                            </div>
                        </div>
                </div>
            </div>
            <div v-else-if="!(Array.isArray(node.children) && node.children.length) && node.component === 'grid'">
                <div v-for="children in node.columns" :key="children.component" 
                            :subGridLength="get_subGridLength(node.columns.length)"> 
                </div>
                <div v-if="subgridLength === 2 || subgridLength === 3 || subgridLength === 4">            
                    <div v-if="subgridLength === 2"><div :col_value="get_subGridCol(6)"></div></div>
                    <div v-if="subgridLength === 3"><div :col_value="get_subGridCol(4)"></div></div>
                    <div v-if="subgridLength === 4"><div :col_value="get_subGridCol(3)"></div></div>
                </div>   
                <v-row justify="center">
                    <v-col cols="12" :lg="subgrid_col" :md="subgrid_col"
                            v-for="children in node.columns"
                            :key="children.component">
                        <RecursionGrid :node="children" />
                    </v-col>
                </v-row>
            </div>
            <div v-else-if="node.component === 'section'"></div>
        </div>  
    </div>
</template>

<script>
export default {
    name : 'RecursionGrid',
    data () {
        return {
            subgridLength : 0,
            subgrid_col : 12,
            headingTag : '',
            divider : {
              divider_id : '',
              divider_class : '',
              divider_style : ''
            },
            button : {
              button_url : ''
            },
            image_base_URL : this.$store.state.image_base_url,
            cms_URL : this.$store.state.url
        }    
    },
    props : {
        node : Object
    },
    methods : {
        get_subGridLength(length) {
            return this.subgridLength = length
        },
        get_subGridCol(value) {
            return this.subgrid_col = value
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
        }
    }
}
</script>

<style scoped>
.node {
    border : solid 1px;
}

</style>