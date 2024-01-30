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

<style scoped>
.side-bar {
  background: #fff;
  padding: 0 10px;
  width: 240px;
  height: 100%;
  position: fixed;
  top: 84px;
  left: -240px;
}
.sidebar-open {
  transition: 0.5s;
  left: 0;
}
.sidebar-closed {
  transition: 0.5s;
  left: -240px;
}

.my-menu {
  margin-top: 10px;
  text-align: center;
}
.my-menu .im {
  margin-top: 5px;
  border: 1px solid #ddd;
  width: 100%;
  display: flex;
}
.my-menu .im a {
  flex: 1;
}
.my-menu .im:hover,
.my-menu .im:hover a {
  background: #010101;
  color: white;
}
.btn-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  padding: 10px 0px 0px;
}
.to-home {
  background: #ddd;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
}
/* 사이드바 닫는 부분 */
.close-bar {
  background-color: transparent;
  font-size: 28px;
}
.close-bar .close-icon {
  pointer-events: none;
}

.profile {
}
.portfolio {
}
.github {
}
.category-header {
  margin-top: 30px;
}
.category-header h2 {
  color: black;
  font-weight: 500;
  font-size: 12px;
  padding-left: 0px;
  margin-bottom: 8px;
}

.category-list {
  padding: 0;
  margin: 0;
}

.category-list .selected {
  font-weight: bold;
}

.category-list li {
  margin-bottom: 10px;
  margin: 0;
  padding: 0;
}

.category-name {
}

.category-count {
  margin-left: 5px;
  color: #888;
}
.tag-header {
  margin-top: 30px;
}
.tag-header h2 {
  color: black;
  font-weight: 500;
  font-size: 12px;
  padding-left: 0px;
  margin-bottom: 8px;
}
.tag-list {
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
}
.tag-list li {
  border: 1px solid black;
  margin: 1px;
  padding: 2px 10px;
  border-radius: 5px;
  font-size: 12px;
}

.tag-list li.selected {
  background-color: black;
}

.tag-list li.selected a{
  color: #ffffff !important;
}

/* 태블릿 */
@media (min-width: 820px) {
  .btn-wrapper {
    display: none;
  }
  .side-bar {
    left: auto;
  }
}

/* 데스크톱 */
@media (min-width: 1340px) {
}
</style>