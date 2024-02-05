<template>
  <main>
    <post-item :posts="getPostList" />
    <post-pagination :pageList="getPageList"/>
  </main>
</template>

<script lang='ts'>
import PostItem from "@/components/posts/PostItem.vue";
import PostPagination from "@/components/posts/PostPagination.vue";
import { defineComponent } from "vue";
import { mapActions, mapGetters, mapMutations } from "vuex";

export default defineComponent({
  async mounted() {
    await this.setPostList();
    this.SET_SELECTED_CATEGORY_ID(null);
  },
  watch: {
    async $route(to, from) {
      const toPage = to.query.page ? to.query.page : 1;
      const toLimit = to.query.limit ? to.query.limit : 15;
      const fromPage = from.query.page ? from.query.page : 1;
      const fromLimit = from.query.limit ? from.query.limit : 15;
      if (toPage !== fromPage || toLimit !== fromLimit) {
        await this.setPostList();
        this.SET_SELECTED_CATEGORY_ID(null);
      }
    }
  },
  computed: {
    ...mapGetters("post", ["getPostList", "getPageList"]),
    ...mapGetters('users', ['getUserRole'])
  },
  methods: {
    ...mapMutations('sidebar', ['SET_SELECTED_CATEGORY_ID']),
    ...mapActions("post", ["fetchPostList"]),
    async setPostList() {
        const userRole = this.getUserRole;
        let { page, limit } = this.$route.query;
        page = page ? page : 1 as any;
        limit = limit ? limit : 15 as any;
        try {
          await this.fetchPostList({ userRole, page, limit });
        } catch (e) {
          console.log(e);
        }
    }
  },
  components: {
    PostItem,
    PostPagination
  },
});
</script>