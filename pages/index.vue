<template>
  <section>
    <div>
      <ul>
        <li v-for="(post, key) in posts" :key="key">
          <div>
            <a v-for="tag in post.tags" :key="tag" :href="'/category/'+tag">{{ tag }}</a>
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
  async asyncData ({ app }) {
    const { data } = await app.$axios.post(process.env.POSTS_URL,
    JSON.stringify({
        filter: { published: true },
        sort: {_created:-1},
        populate: 1
      }),
    {
      headers: { 'Content-Type': 'application/json' }
    })

    return { posts: data.entries }
  }
}
</script>