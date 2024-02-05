<template>
  <article
    class="side-bar"
    :class="{
      'sidebar-open': getSidebarStatus,
      'sidebar-close': !getSidebarStatus,
    }"
  >
    <div class="my-menu">
      <div class="btn-wrapper">
        <button class="to-home" @click="toHome">홈으로</button>
        <button class="close-bar" v-on:click="SET_SIDEBAR">
          <font-awesome-icon
            :icon="['fas', 'xmark']"
            class="close-icon"
            v-if="getSidebarStatus"
          />
        </button>
      </div>
      <!-- <div class="im profile">
        <a href="#">프로필</a>
      </div>
      <div class="im portfolio">
        <a href="#">포트폴리오</a>
      </div> -->
      <div class="im github">
        <a href="#">GitHub <font-awesome-icon icon="fa-brands fa-square-github" /></a>
      </div>
    </div>
    <div class="category-header">
      <h2>카테고리</h2>
    </div>
    <ul class="category-list">
      <li>
        <router-link to="/post">
          <span class="category-name" :class="{ 'selected': !getSelectedCategoryId  }">전체보기</span>
          <span class="category-count">({{ getPostCount }})</span>
        </router-link>
      </li>
      <li v-for="(category, index) in getSidebarCategories" :key="index">
        <router-link :to="'/category/' + category.id">
          <span class="category-name" :class="{ 'selected': getSelectedCategoryId === category.id }">{{ category.name }}</span>
          <span class="category-count">({{ category.postCount }})</span>
        </router-link>
      </li>
    </ul>
    <div class="tag-header">
      <h2>태그({{ getSidebarTags.length }})</h2>
    </div>
    <ul class="tag-list">
      <li v-for="(tag, index) in getSidebarTags" :key="index"  :class="{ 'selected': getSelectedTagId === tag.id }">
        <router-link :to="'/tag/'+ tag.id">{{ tag.name }}</router-link>
      </li>
    </ul>
  </article>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapMutations, mapGetters } from "vuex";

export default defineComponent({
  computed: {
    ...mapGetters("sidebar", [
      "getSidebarStatus",
      "getSidebarCategories",
      "getSidebarTags",
      "getSelectedCategoryId",
      "getSelectedTagId",
      "getPostCount"
    ])
  },
  methods: {
    ...mapMutations("sidebar", ["SET_SIDEBAR"]),
    toHome() {
      this.$router.push("/");
    },
  },
});
</script>

<style src="@/styles/sidebar.css" scoped>
</style>