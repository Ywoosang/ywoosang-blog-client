<template>
    <div class="post-container">
        <article class="post" v-for="post in posts" :key="post.id">
            <h2><router-link :to="{
                name: 'Post',
                params: {
                    id: post.id
                }
            }">{{ post.title }}</router-link></h2>
            <p class="timestamp">{{ formatDate(post.createdAt) }}</p>
            <p class="description">{{ post.description }}</p>
            <div class="tags">
                <router-link :to="`/tags/@${tag.name}`" class="tag" v-for="tag in post.tags" :key="tag.id">{{ tag.name }}</router-link>
            </div>
        </article>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { formatDate } from '@/utils';

export default defineComponent({
    props: ['posts'],
    methods: {
        formatDate
    }
})
</script>

<style scoped>
.post {
  border: 1px solid #ddd;
  padding: 10px 20px;
  border-radius: 10px;
  margin-bottom: 10px;
  font-size: 13px;
}

.post h2 {
    color: #333;
    margin: 5px 0px 0px;
}
.post .timestamp {
    color: #888;
    margin: 5px 0 0 0;
}
.post .description {
    margin-bottom: 20px;
}
.post .tags {
    display: flex;
    flex-wrap: wrap;
}
.post .tag {
    cursor:pointer;
    margin-right: 10px;
    margin-bottom: 10px;
    padding: 5px 10px;
    border-radius: 5px;
    border: 1px solid black;
}

/* 태블릿 */
@media (min-width: 820px) {
   .post{
        font-size: 16px;
   }
}

/* 데스크톱 */
@media (min-width: 1340px) {
    .post {
    }
}
</style>