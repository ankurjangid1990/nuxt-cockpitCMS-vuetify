<template>
  <section>
    <div>
      <h1>Posts tagged with "{{ category }}"</h1>
      <ul>
        <li v-for="(post, key) in posts" :key="key">
          <div>
            <a v-for="(tag, key) in post.tags" :key="key" :href="'/category/'+tag">{{ tag }}</a>
          </div>

          <a :href="'/'+post.title_slug">
            <h2>
              {{ post.title }}
            </h2>
          </a>

          <div v-html="post.excerpt">
          </div>
          <a :href="'/'+post.title_slug">
            Read more
          </a>
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