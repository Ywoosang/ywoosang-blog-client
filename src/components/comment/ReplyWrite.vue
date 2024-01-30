<template>
  <div class="wrapper">
    <div class="write">
        <textarea placeholder="답글을 작성하세요"
            ref="commentTextarea"
            @input="adjustTextareaHeight"
            v-model="content"
        ></textarea>
        <div class="btn-wrapper">
            <button v-if="editMode" class="update" @click="submitReplay">수정</button>
            <button v-else class="create" @click="submitReplay">답글 달기</button>
            <button class="exit" @click="$emit('close')">취소</button>
        </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from "vue";
import { mapActions } from "vuex";

export default defineComponent({
    // props: {'parentCommentId', 'replyToId', 'editMode'],
    props: {
        parentCommentId: {
            type: Number,
            default: null,
        },
        replyToId: {
            type: Number,
            default: null,
        },
        editMode: {
            type: Boolean,
            default: false,
        },
        id: {
            type: Number,
            default: null
        },
        isComment: {
            type: Boolean,
            default: true
        }
    },
   data() {
        return {
            content: ''
        }
    },
    methods: {
        ...mapActions('comment',['createReply', 'updateReply', 'updateComment']),
        async submitReplay() {
            try {
                if(this.content.trim() == '') return alert('내용을 입력하세요');
                const payload: any = {
                    parentCommentId: this.parentCommentId,
                    id: this.id,
                    content: this.content,
                    replyToId: this.replyToId
                }
                console.log(payload);
                if(!this.editMode) {
                    await this.createReply(payload);
                } else {
                    if(this.isComment) {
                        await this.updateComment(payload);
                    } else {
                        await this.updateReply(payload);
                    }
                }
                this.content = '';
                this.$emit('close');
            } catch(e: any) {
                if(e.response && e.reponse.status == 401) {
                    this.$router.push('/auth/signin');
                }
            }
        },
        adjustTextareaHeight() {
            const textarea: any = this.$refs.commentTextarea;
            textarea.style.height = 'auto'; // 초기 높이로 설정
            textarea.style.height = `${textarea.scrollHeight}px`; // 실제 높이로 조절
        },
    },
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
.exit {
    margin-left: 4px;
    padding: 3px 7px;
}

</style>