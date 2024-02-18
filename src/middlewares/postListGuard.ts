export default async function (to, from, next) {
	const page = to.query.page;
	const limit = to.query.limit;
	if (
		!(
			(/^\d+$/.test(page) || page == undefined) &&
			(/^\d+$/.test(limit) || limit == undefined)
		)
	) {
		// 숫자가 아닌 경우 404 페이지로 이동
		next({ path: '/404', replace: true });
	}
	next();
}
