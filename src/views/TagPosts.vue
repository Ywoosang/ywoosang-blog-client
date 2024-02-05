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
    await this.setTag();
    this.SET_SELECTED_TAG_ID(parseInt(this.$route.params.id as string));
  },
  watch: {
    async $route(to, from) {
      // param 도 다르면 바꿔야 함 
      const toPage = to.query.page ? to.query.page : 1;
      const toLimit = to.query.limit ? to.query.limit : 15;
      const fromPage = from.query.page ? from.query.page : 1;
      const fromLimit = from.query.limit ? from.query.limit : 15;
      const tagId = to.params.id;
      if (toPage !== fromPage || toLimit !== fromLimit || to.params.id !== from.params.id) {
        await this.setTag();
        this.SET_SELECTED_TAG_ID(parseInt(tagId as string));
      }
    }
  },
  computed: {
     ...mapGetters('users', ['getUserRole']),
    ...mapGetters("tag", ["getTag", "getPageList"]),
    getPostList() {
      return this.getTag ? this.getTag.posts : []
    }
  },
  methods: {
    ...mapMutations('sidebar', ['SET_SELECTED_TAG_ID']),
    ...mapActions("tag", ["fetchTag"]),
    async setTag() {
        const userRole = this.getUserRole;
        let { page, limit } = this.$route.query;
        const { id } = this.$route.params;
        page = page ? page : 1 as any; 
        limit = limit ? limit : 15 as any;
        try {
          await this.fetchTag({ id, userRole, page, limit });
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