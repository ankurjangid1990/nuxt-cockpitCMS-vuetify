<template>
  <v-app>
    <div>
      <div class="overflow-hidden content">
        <v-img dark height="100"        
                    src="http://localhost/cockpit-master/storage/uploads/2019/10/26/5db433123c796copy-background2.png"
                    alt="https://thestaticvoid.com/wordpress/wp-content/uploads/2013/05/copy-background2.png">
          <page-header class="mt-5"/>
          <page-nav/>
        </v-img>
          <nuxt/>
        <page-footer/>
      </div>
    </div>
  </v-app>
</template>

<script>
import PageHeader from '~/components/PageHeader.vue'
import PageNav from '~/components/PageNav.vue'
import PageFooter from '~/components/PageFooter.vue'

export default {
  components: {
    PageHeader,
    PageNav,
    PageFooter
  }
}
</script>

<style>
.content {
  font-family : Verdana;
}
</style>