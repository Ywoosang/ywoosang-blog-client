<template>
  <div class='viewer-wrapper'>
    <div id="viewer">
    </div>
  </div>
</template>

<script lang="ts">
import "@toast-ui/editor/dist/toastui-editor.css"; // Editor's Style
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
import "@toast-ui/editor/dist/i18n/ko-kr";
import Viewer from '@toast-ui/editor/dist/toastui-editor-viewer';
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all.js";
import { getPost, getPublicPost } from "@/services/api/post";
import { UsersRole } from "@/types/enums";
import { defineComponent } from "vue"
import { mapGetters, mapActions, mapMutations } from "vuex";
import { PostStatus } from '@/types/enums';

interface Post {
  id: number,
  title: string,
  content: string,
  status: PostStatus,
  createdAt: Date,
  updatedAt: Date
}


export default defineComponent({
    data() {
      return {
        viewer: null as null | Viewer,
        post: null as null | Post
      }
    },
    async mounted() {
      // let content;
      const id: string | string[] = this.$route.params.id;
      if (Array.isArray(id) || Number.isNaN(id)) {
        return this.$router.push('/');
      } 
      const postId = parseInt(id);
      try {
        await this.fetchUser();
        this.SET_IS_LOGGED_IN(true);
      } catch(e) {
        this.SET_IS_LOGGED_IN(false);
      }
      if(this.getUserRole == UsersRole.ADMIN) {
        const { data } = await getPost(postId);
        this.post = data;
      } else {
        const { data } = await getPublicPost(postId);
        this.post = data;
      }
      // https://loy124.tistory.com/393
      this.viewer = new Viewer({
        el: document.querySelector('#viewer') as HTMLElement,
        initialValue: this.post!.content,
        plugins: [[codeSyntaxHighlight, {}]]
      });
    },
    methods: {
      ...mapActions('users', ['fetchUser']),
      ...mapMutations('auth', ['SET_IS_LOGGED_IN'])
    },
    computed: {
      ...mapGetters('auth', ['isLoggedIn']),
      ...mapGetters('users', ['getUserRole'])
    }
});
</script>

<style>

</style>