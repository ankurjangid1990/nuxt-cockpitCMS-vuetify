<template>
  <v-app>
    <div>
      <page-header/>
      <page-nav/>
      <nuxt/>
      <page-footer/>
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