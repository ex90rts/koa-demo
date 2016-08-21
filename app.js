/**
 * Created by ex90rts on 8/20/16.
 */
const koa = require('koa');
const router = require('koa-router')();
const views = require('koa-views');
const bodyParser = require('koa-bodyparser');
const session = require('koa-session');

const errors = require('./middlewares/errors');
const admin = require('./middlewares/admin');

const postController = require('./controllers/post');
const adminController = require('./controllers/admin');

const app = new koa();

app.keys = ['hush'];
app.use(session(app));
app.use(bodyParser());
app.use(views(__dirname + '/views', 'jade'));
app.use(errors());
app.use(admin());

// routes
router.get('/', postController.list);
router.post('/admin/post', postController.create);
router.get('/admin/post/new', postController.create);
router.get('/post/:id', postController.view);
router.get('/admin/post/:id/edit', postController.update);
router.post('/admin/post/:id', postController.update);
router.get('/login', adminController.login);
router.post('/login', adminController.login);
router.get('/logout', adminController.logout);

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000, function(){
  console.log("Server is up at: http://127.0.0.1:3000");
});