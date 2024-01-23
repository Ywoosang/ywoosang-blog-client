import { PostStatus } from "../enums";

export interface createPostDto {
    title: string;
    description: string;
    content: string;
    status: PostStatus;
    categoryId?: number;
    tagNames?: string[];
    imageIds?: number[];
}