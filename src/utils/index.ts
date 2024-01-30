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
      return targetDate.toLocaleString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' });
    } 
    else if (diffInHours >= 24) {
      return `${diffInDays}일 전`;
    } 
    else if (diffInHours >= 1) {
      return `${diffInHours}시간 전`;
    } else if (diffInMinutes >= 1) {
      return `${diffInMinutes}분 전`;
    }  
}