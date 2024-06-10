import { PostStatus } from '../enums';

export interface CreatePostDto {
  title: string;
  description: string;
  content: string;
  status: PostStatus;
  categoryId?: number;
  tagNames?: string[];
  fileNames?: string[];
}

export interface UpdatePostDto {
  title: string;
  description: string;
  content: string;
  status: PostStatus;
  categoryId: number | null;
  tagNames: string[] | null;
  fileNames: string[] | null;
}

export interface AuthRegisterDto {
  email: string;
  userId: string;
  nickname: string;
  description: string;
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

export interface updateProfileDto {
  nickname?: string;
  profileImage?: string;
  description?: string;
}
