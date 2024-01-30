import { PostStatus } from "../enums";

export interface CreatePostDto {
    title: string;
    description: string;
    content: string;
    status: PostStatus;
    categoryId?: number;
    tagNames?: string[];
    imageIds?: number[];
}

export interface AuthRegisterDto {
    email: string;
    userLoginId: string;
    nickname: string;
    password: string;
}

export interface CreateReplyDto {
    content: string;
    replyToId: number;
}

export interface CreateCommentDto {
    content: string;
    postId: number;
}

export interface UpdateCommentDto {
    content: string;
}