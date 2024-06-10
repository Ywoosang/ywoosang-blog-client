export default async function (to, from, next) {
  const page = to.query.page;
  const limit = to.query.limit;
  if (!((/^\d+$/.test(page) || page == undefined) && (/^\d+$/.test(limit) || limit == undefined))) {
    return next({ name: 'NotFound' });
  }
  next();
}
