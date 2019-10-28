
// store state
export const state = () => ({
    posts: [],
    url : 'http://localhost',
    image_base_url : 'http://localhost/cockpit-master/storage/uploads'
});

// store mutations
export const mutations = {
    SET_POSTS: (state, payload) => {
        state.posts = payload
    }
};

// store actions
export const actions = {
    async nuxtServerInit({ commit }, { $axios }){
        const data = await $axios.$post(process.env.POSTS_URL,
            JSON.stringify({
                filter: { published: true },
                sort: {_created:-1},
                populate: 1
              }),
            {
              headers: { 'Content-Type': 'application/json' }
            })
        
        const posts = data.entries
        let grids = posts.map(post => post.grid)   

        commit("SET_POSTS", posts);
    }
}