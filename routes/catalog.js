const express = require('express');
const router = express.Router();

// 导入控制器模块
const book_controller = require('../controllers/bookController');
const author_controller = require('../controllers/authorController');
const genre_controller = require('../controllers/genreController');
const book_instance_controller = require('../controllers/bookInstanceController');

/// 藏书路由 ///

// GET 获取藏书编目主页
router.get('/', book_controller.index);

// GET 请求添加新的藏书。注意此项必须位于显示藏书的路由（使用了 id）之前。
router.get('/book/create', book_controller.book_create_get);

// POST 请求添加新的藏书
router.post('/book/create', book_controller.book_create_post);

// GET 请求删除藏书
router.get('/book/:id/delete', book_controller.book_delete_get);

// POST 请求删除藏书
router.post('/book/:id/delete', book_controller.book_delete_post);

// GET 请求更新藏书
router.get('/book/:id/update', book_controller.book_update_get);

// POST 请求更新藏书
router.post('/book/:id/update', book_controller.book_update_post);

// GET 请求藏书
router.get('/book/:id', book_controller.book_detail);

// GET 请求完整藏书列表
router.get('/books', book_controller.book_list);



/// bookinstance 路由///

// 创建新作者表单 
router.get('/bookinstance/create', book_instance_controller.instance_create_get)
router.post('/bookinstance/create', book_instance_controller.instance_create_post)

router.get('/bookinstances', book_instance_controller.book_instance_list);
router.get('/bookinstance/:id', book_instance_controller.bookinstance_detail);



/// 藏书副本、藏书种类、作者的路由与藏书路由结构基本一致，只是无需获取主页 ///
/// author 路由/// 

// 创建新作者表单 
router.get('/author/create', author_controller.author_create_get)
router.post('/author/create', author_controller.author_create_post)

router.get('/authors', author_controller.author_list);

// 作者详情
router.get('/author/:id', author_controller.author_detail);



/// genre 路由 ///
// genre 新建
router.get('/genre/create', genre_controller.genre_create_get);
router.post('/genre/create', genre_controller.genre_create_post)

// genre 列表
router.get('/genres', genre_controller.genre_list);
// genre 详情
router.get('/genre/:id', genre_controller.genre_detail);


module.exports = router;