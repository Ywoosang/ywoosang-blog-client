import { UsersRole, UsersStatus, PostStatus } from "../enums";

export interface User {
    id: number;
    email: string;
    userLoginId: string;
    nickname: string;
    description?: string;
    role: UsersRole;  
    status: UsersStatus;
}

export interface Post {
    id: number;
    title: string;
    content: string;
    status: PostStatus;
    createdAt: Date;
    updatedAt: Date;
}

export interface Category {
    id: number;
    name: string;
    posts?: Post[]
}

export interface Tag {
    id: number;
    name: string;
    posts?: Post[]
}

export interface Page {
    currentPage: number;
    page: number;
}

export interface AuthState {
    isLoggedIn: boolean;
}

export interface SidebarState {
    isOpen: boolean;
    categories: [];
    tags: [];
    selectedCategoryId: null | number;
    selectedTagId: null | number;
    postCount: number;
}

export interface UsersState {
    user: User | null;
}

export interface PostState {
    postList: null | Post[];
    // 총 게시물 개수
    total: number | null;
    // 페이지네이션 목록
    pageList: Page[];
}

export interface TagState {
    tag: null | Tag,
    pageList: Page[];
}

export interface CategoryState {
    category: null | Category,
    pageList: Page[];
}

export interface RootState {
    sidebarModule: SidebarState;
}


  