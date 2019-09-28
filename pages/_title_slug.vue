<template>
  <section>
    <article>
      <div>
        <a v-for="(tag, key) in post.tags" :key="key" :href="'/category/'+tag">{{ tag }}</a>
      </div>
      <h1>
        {{ post.title }}
      </h1>
      <div v-html="$options.filters.parseMd(post.excerpt + '\n' + post.content)">
      </div>
    </article>
  </section>
</template>

<script>
export default {
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