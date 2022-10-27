module.exports = app => {
  const { router, controller } = app;
  router.get('/callback/github', controller.home.index);
  router.get('/', controller.callback.index);
};