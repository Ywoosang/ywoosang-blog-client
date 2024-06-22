<template>
  <q-card
    style="max-width: 800px; border-bottom: 1px solid #ddd"
    class="post_item column q-mb-md no-shadow full-width no-border-radius"
  >
    <div class="row no-wrap reverse">
      <div v-if="post.image" class="post-image-container">
        <q-img :src="post.image" alt="Post Image" class="post-image" />
      </div>
      <div class="col column no-wrap justify-between">
        <q-card-section class="q-pt-sm q-pb-none q-py-md-sm q-px-sm q-px-md-md">
          <h5 class="text-bold q-pb-sm">
            {{ post.title }}
          </h5>
          <p class="line-clamp">
            {{ post.excerpt }}
          </p>
        </q-card-section>
        <q-card-actions class="q-pa-none q-pa-md-sm">
          <q-btn
            size="sm"
            flat
            :to="`/category/${post.category}`"
            class="text-weight-bold text-cyan-4"
          >
            {{ post.category }}
          </q-btn>
          <span class="text-caption q-ml-sm">{{ post.date }}</span>
        </q-card-actions>
      </div>
    </div>
  </q-card>
</template>

<script setup lang="ts">
const post = {
  id: 1,
  title: '[TechNews] 유용한 개발 관련 아티클 및 영상 #25',
  excerpt:
    '유용한 개발 관련 아티클 및 영상 #25 Kotlin 1.9.2에 도입된 Enum entriesvalues의 경우 매번 새로운 배열이 생성됨 배열이 반환되는데... 유용한 개발 관련 아티클 및 영상 #25 Kotlin 1.9.2에 도입된 Enum entriesvalues의 경우 매번 새로운 배열이 생성됨 배열이 반환되는데.. 유용한 개발 관련 아티클 및 영상 #25 Kotlin 1.9.2에 도입된 Enum entriesvalues의 경우 매번 새로운 배열이 생성됨 배열이 반환되는데..',
  image:
    'https://blog.kakaocdn.net/dn/pz36O/btsH6xVZw4W/Ah0vT11QXaUSUFbcEEIyjk/img.png',
  slug: 'technews-25',
  category: 'Spring',
  date: '2024. 6. 21. 10:00',
};
</script>

<style scoped>
.post-image-container {
  width: 90px;
  height: 90px;
}

.post-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.line-clamp {
  display: -webkit-box;
  -webkit-line-clamp: 2; /* 표시할 줄 수 */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
}

@media (min-width: 600px) {
  .post-image-container {
    width: 150px;
    height: 150px;
  }
  .line-clamp {
    -webkit-line-clamp: 3;
  }
}
</style>
