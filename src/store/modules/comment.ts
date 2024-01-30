import { Module, MutationTree, ActionTree, GetterTree } from 'vuex';
import { RootState, CommentState } from '@/types/interfaces';
import { getComments, createComment, createReply, deleteComment, updateComment } from '@/services/api/comment';
import { CreateCommentDto, CreateReplyDto } from '@/types/dto';
import { Comment } from '@/types/interfaces';

const state: CommentState = {
    comments: []
};

export const mutations: MutationTree<CommentState> = {
  SET_COMMENTS(state, comments) {
    state.comments = comments;
  },
  SET_NEW_COMMENT(state, comment) {
    state.comments.push(comment);
  },
  // 배열 변경 감지 https://jh-7.tistory.com/19
  SET_NEW_REPLY(state, reply) {
    state.comments = state.comments.map(comment => {
      if(comment.id == reply.parentCommentId) {
        if(!comment.replies) {
          comment.replies = [];
        }
        comment.replies.push(reply)
      }
      return comment;
    })
    // 동작하지 않음
    // for(let i=0; i < state.comments.length; i++) {
    //   if(state.comments[i].id == reply.parentCommentId) {
    //     state.comments[i].replies.push(reply);
    //     break;
    //   }
    // }
  },
  REMOVE_COMMENT(state, comment) {
    state.comments = state.comments.filter(c => c.id != comment.id);
  },
  REMOVE_REPLY(state, reply) {
    state.comments = state.comments.map(comment => {
      if(comment.id == reply.parentCommentId) {
        comment.replies = comment.replies.filter(r => r.id != reply.id)
      }
      return comment;
    })
  },
  UPDATE_COMMENT(state, comment) {
    state.comments = state.comments.map(c => {
      if(c.id == comment.id) c.content = comment.content;
      return c;
    })
  },
  UPDATE_REPLY(state, reply) {
    state.comments = state.comments.map(comment => {
      if(comment.id == reply.parentCommentId){
        comment.replies = comment.replies.map(r => {
          if(r.id == reply.id) r.content = reply.content;
          return r;
        })
      }
      return comment;
    })
  }
};

export const actions: ActionTree<CommentState, RootState> = {
  async fetchComments({ commit }, payload) {
    const { postId } = payload;
    const { data } = await getComments(postId);
    commit('SET_COMMENTS',data)
  },
  async createComment({ commit }, payload) {
    const { content, postId } = payload;
    const createCommentDto: CreateCommentDto = {
      content,
      postId
    }
    const { data } = await createComment(createCommentDto);
    commit('SET_NEW_COMMENT',data);
  },
  async createReply({ commit }, payload) {
    const { parentCommentId, content, replyToId } = payload;
    const createReplyDto: CreateReplyDto = {
      content,
      replyToId
    }
    const { data } = await createReply(parentCommentId, createReplyDto);
    commit('SET_NEW_REPLY', data);
  },
  async deleteComment({commit}, payload) {
    const { comment } = payload;
    await deleteComment(comment.id);
    commit('REMOVE_COMMENT',comment);
  },
  async deleteReply({ commit }, payload) {
    const { reply } = payload;
    await deleteComment(reply.id);
    commit('REMOVE_REPLY', reply);
  },
  async updateReply({ commit }, payload) {
    const { id, content } = payload;
    const response = await updateComment(id, { content });
    const comment: Comment = response.data;
    commit('UPDATE_REPLY', comment)
  },
  async updateComment({ commit }, payload) {
    const { id, content } = payload;
    const response = await updateComment(id, { content });
    const comment: Comment = response.data;
    commit('UPDATE_COMMENT',comment)
  }
};

const getters: GetterTree<CommentState, RootState>  = {
  getComments: (state) => state.comments
};

const categoryModule: Module<CommentState, RootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};

export default categoryModule;
