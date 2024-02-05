<template>
  <main>
    <post-item :posts="postList" />
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
    await this.setCategory();
    this.SET_SELECTED_CATEGORY_ID(parseInt(this.$route.params.id as string));
  },
  watch: {
    async $route(to, from) {
      const toPage = to.query.page ? to.query.page : 1;
      const toLimit = to.query.limit ? to.query.limit : 15;
      const fromPage = from.query.page ? from.query.page : 1;
      const fromLimit = from.query.limit ? from.query.limit : 15;
      const categoryId = to.params.id as string;
      if (toPage !== fromPage || toLimit !== fromLimit || to.params.id !== from.params.id) {
        await this.setCategory();
        this.SET_SELECTED_CATEGORY_ID(parseInt(categoryId));
      }
    }
  },
  computed: {
    ...mapGetters("category", ["getCategory", "getPageList"]),
    ...mapGetters('users', ['getUserRole']),
    postList() {
      return this.getCategory ? this.getCategory.posts : [];
    }
  },
  methods: {
    ...mapMutations("sidebar", ["SET_SELECTED_CATEGORY_ID"]),
    ...mapActions("category", ["fetchCategory"]),
    async setCategory() {
      const userRole = this.getUserRole;
      let { page, limit } = this.$route.query;
      const { id } = this.$route.params;
      page = page ? page : 1 as any;
      limit = limit ?  limit : 15 as any;
      try {
        await this.fetchCategory({ id, userRole, page, limit });
       
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