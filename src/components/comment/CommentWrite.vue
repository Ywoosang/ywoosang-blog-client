<template>
  <div class="wrapper">
    <div class="write">
        <textarea placeholder="댓글을 작성하세요"
            ref="commentTextarea"
            @input="adjustTextareaHeight"
            v-model="content"
        ></textarea>
        <div class="btn-wrapper">
            <button class="create" @click="submitComment">댓글 작성</button>
        </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from "vue";
import { mapActions } from "vuex";
import { CreateCommentDto } from '@/types/dto'

export default defineComponent({
    props: ['postId'],
    data() {
        return {
            content: ''
        }
    },
    methods: {
        ...mapActions('comment',['createComment']),
        async submitComment() {
            try {
                if(this.content.trim() == '') return alert('내용을 입력하세요');
                const payload: CreateCommentDto = {
                    content: this.content,
                    postId: this.postId
                }
                await this.createComment(payload);
                this.content = '';
            } catch(e: any) {
                if(e.response && e.response.status == 401) {
                    return this.$router.push('/auth/signin');
                }
            }
        },
        adjustTextareaHeight() {
            const textarea: any = this.$refs.commentTextarea;
            textarea.style.height = 'auto'; // 초기 높이로 설정
            textarea.style.height = `${textarea.scrollHeight}px`; // 실제 높이로 조절
        },
    }
})
</script>

<style scoped>
.wrapper {
    margin: 10px 0 0 0;
}
textarea {
    padding: 8px 10px;
    border: 1px solid #ddd;
    width: 100%;
    min-height: 70px;
    font-size: 1rem;
    line-height: 1.75;
    overflow-y: hidden;
}
.btn-wrapper {
    text-align: right;
}
.create {
    padding: 3px 7px;

}

</style>