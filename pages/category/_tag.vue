<template>
  <section>
    <div class="my-5 tags container">

      <div>        
        <h1>
          Posts tagged with "{{ category }}"
        </h1>
      </div>

      <ul>
        <li class="my-5" v-for="(post, key) in posts" :key="key">
          <!-- Tag -->
          <div>
            <a class="mx-1 pa-1 overline grey lighten-2"
                style="border-radius : 4px; color : #448AFF; text-decoration: none"
                v-for="(tag, key) in post.tags" 
                :key="key" 
                :href="'/category/'+tag">
                  #{{ tag }}
            </a>
          </div>
          
          <!-- Title -->
          <div class="my-2 headline font-weight-regular">
            <a class="teal--text"
                style="text-decoration: none"
                :href="'/'+post.title_slug">
                {{ post.title }}
            </a>
          </div>

          <!-- Excerpt -->
          <div class="subtitle-2 font-weight-regular"
               style=""
                v-html="post.excerpt">
          </div>

          <!-- Title Slug -->
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
export default {
  async asyncData ({ app, params, error, payload }) {
    if (payload) {
      return { posts: payload, category: params.tag }
    } else {
      let { data } = await app.$axios.post(process.env.POSTS_URL,
      JSON.stringify({
          filter: { published: true, tags: { $has:params.tag } },
          sort: {_created:-1},
          populate: 1
        }),
      {
        headers: { 'Content-Type': 'application/json' }
      })

      if (!data.entries[0]) {
        return error({ message: '404 Page not found', statusCode: 404 })
      }

      return { posts: data.entries, category: params.tag }
    }
  }
}
</script>