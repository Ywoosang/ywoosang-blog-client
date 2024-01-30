<template>
    <div class="post-container">
        <article class="post" v-for="post in posts" :key="post.id">
            <div class="delete-btn" @click="deletePost(post.id)" v-if="getUserRole == 'ADMIN'">삭제</div>
            <h2><router-link :to="{
                name: 'Post',
                params: {
                    id: post.id
                }
            }">{{ post.title }}</router-link></h2>
            <p class="timestamp">{{ formatDate(post.createdAt) }}</p>
            <p class="description">{{ post.description }}</p>
            <div class="tags">
                <router-link :to="`/tag/${tag.id}`" class="tag" v-for="tag in post.tags" :key="tag.id">{{ tag.name }}</router-link>
            </div>
        </article>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { formatDate } from '@/utils';
import { deletePost } from '@/services/api/post'
import { mapGetters } from "vuex";

export default defineComponent({
    props: ['posts'],
    methods: {
        async deletePost(id:number) {
            try{
                const confirmed = window.confirm('정말로 삭제하시겠습니까?');
                if (confirmed) {
                    await deletePost(id)
                }
                location.reload();
            } catch (e) {
                console.log(e);
            }
        },
        formatDate
    },
    computed: {
        ...mapGetters('users',['getUserRole'])
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
    margin: 5px 0;
}
.post .tags {
    display: flex;
    flex-wrap: wrap;
}
.post .tag {
    cursor:pointer;
    margin-right: 2px;
    margin-bottom: 2px;
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
    .post .tag{
        margin-right: 10px;
        margin-bottom: 10px;
    }
    .post .description {
        margin-bottom:15px;
    }
}
</style>