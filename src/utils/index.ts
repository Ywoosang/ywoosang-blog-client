export const createSlug = (title: string) => {
	return title.trim().split(' ').join('-');
};

export const formatDate = (date: string) => {
	const currentDate: Date = new Date();
	const targetDate: Date = new Date(date);

	const diffInSeconds: number = Math.floor((currentDate.getTime() - targetDate.getTime()) / 1000);

	if (diffInSeconds < 60) {
	  return "방금 전";
	}

	const diffInMinutes: number = Math.floor(diffInSeconds / 60);
	const diffInHours: number = Math.floor(diffInSeconds / (60 * 60));
	const diffInDays: number = Math.floor(diffInSeconds / (60 * 60 * 24));

	if (diffInDays > 7) {
	const year = targetDate.getFullYear();
	const month = String(targetDate.getMonth() + 1).padStart(2, '0');
	const day = String(targetDate.getDate()).padStart(2, '0');
	const hours = String(targetDate.getHours()).padStart(2,'0');
    const minutes = String(targetDate.getMinutes()).padStart(2,'0');
	return `${year}년 ${month}월 ${day}일 ${hours}시 ${minutes}분`;
	}
	else if (diffInHours >= 24) {
	  return `${diffInDays}일 전`;
	}
	else if (diffInHours >= 1) {
	  return `${diffInHours}시간 전`;
	} else if (diffInMinutes >= 1) {
	  return `${diffInMinutes}분 전`;
	}
};
