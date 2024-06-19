export default function (to, from, next) {
  const page = to.query.page;
  if (/^\d+$/.test(page) || page == undefined) return next();
  return next({ name: 'NotFound' });
}
