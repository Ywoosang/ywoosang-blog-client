import { UsersRole, UsersStatus, PostStatus, ModalStatus } from '../enums';

export interface User {
	id: number;
	email: string;
	userId: string;
	nickname: string;
	profileImage: string;
	description?: string;
	role: UsersRole;
	status: UsersStatus;
}

export interface Post {
	id: number;
	title: string;
	content: string;
	description: string;
	status: PostStatus;
	// 문자열로 전송
	createdAt: string;
	updatedAt: string;
	tags?: Tag[]
}

export interface Category {
	id: number;
	name: string;
	posts?: Post[];
}

export interface Tag {
	id: number;
	name: string;
	posts?: Post[];
}

export interface Comment {
	id: number;
	content: string;
	parentCommentId: number | null;
	replyTo: User;
	user: User;
	post: Post;
	parentComment: Comment | null;
	replies: Comment[];
	createdAt: string;
	updatedAt: string;
}

export interface Page {
	currentPage: number;
	page: number;
}

export interface AuthState {
	isLoggedIn: boolean | null;
	isModalOpen: boolean;
	modalStatus: ModalStatus;
	email: string | null;
}

export interface ErrorContent {
	content: string;
	key: string;
}

export interface SidebarState {
	isOpen: boolean;
	categories: [];
	tags: [];
	selectedCategoryId: null | number;
	selectedTagId: null | number;
	postCount: number;
}

export interface HeaderState {
	isDropdownOpen: boolean;
}

export interface ErrorState {
	modalList: ErrorContent[];
}

export interface UsersState {
	user: User | null;
	publicProfile: Pick<
		User,
		'id' | 'description' | 'nickname' | 'profileImage' | 'userId'
	> | null;
	activities: any;
	pageList: any;
	totalActivitiesCount: number;
}

export interface Page {
	currentPage: number;
	page: number;
}


export interface PostState {
	postList: null | Post[];
	// 총 게시물 개수
	total: number | null;
	// 페이지네이션 목록
	pageList: Page[];
	// 현재 게시물
	post: null | Post;
	// 수정할 게시물
	editingPost: null | Post;
}

export interface TagState {
	tag: null | Tag;
	pageList: Page[];
}

export interface CategoryState {
	category: null | Category;
	pageList: Page[];
}

export interface CommentState {
	comments: any;
}

export interface RootState {
	sidebarModule: SidebarState;
}
