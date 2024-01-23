<template>
  <div class="container">
   <blog-header/>
      <section class="section">
      <blog-sidebar/>
      <router-view/>
    </section>
  </div>
</template>

<script>
import BlogHeader from '../components/common/BlogHeader.vue'
import BlogSidebar from '../components/common/BlogSidebar.vue'

export default {
  components: {
    BlogHeader,
    BlogSidebar
  }
}
</script>
 
<style scoped>
.container {
  margin: 0 auto;
  min-width: 320px;
  align-items: center;
  height: 100%;
}
section {
  margin-top: 84px;
  display: flex;
  height: calc(100% - 84px);
  box-sizing: border-box;
}
main {
  box-sizing: border-box;
  padding: 10px 20px;
  flex: 1;
  height: 100%;
}

/* 태블릿 */
@media (min-width: 820px) {
  section {
      max-width: calc(1100px);
      margin: 0 auto;
      margin-top: 84px;
  }
  main {
     margin-left: 240px;
     max-width: calc(1100px - 240px);
  }
}

/* 데스크톱 */
@media (min-width: 1340px) {
  section {
    max-width: calc(1356px);
  }
}
</style>