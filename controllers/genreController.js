const Genre = require('../models/genre')

const Book = require('../models/book')
var async = require('async')

const {body, validationResult} = require('express-validator')
const {sanitizeBody} = require('express-validator/filter')

// 种类列表
exports.genre_list = (req, res, next)=>{

    Genre.find()
    .sort([['name','ascending']])
    .exec(function (err, list_genre) {
        if(err) {return next(err)}
        res.render('genre_list', { title: 'Genre List',  genre_list: list_genre})
    })
}

// 种类详情
exports.genre_detail = function(req, res, next){
    async.parallel({
        genre: function(callback){
            Genre.findById(req.params.id)
            .exec(callback)
        },
        genre_books: function(callback){
            Book.find({'genre': req.params.id})
            .exec(callback)
        }
    },function(err, results){
        if(err) {return next(err)}

        if(results.genre == null){
            var err = new Error('Genre not found')
            err.status = 404
            return next(err)
        }

        res.render('genre_detail',{title: 'Genre Detail', genre: results.genre, genre_books: results.genre_books})
    })
}


// 添加种类的表单
exports.genre_create_get = function(req, res, next){
    res.render('genre_form', {title: 'Create Genre'})
}

exports.genre_create_post = [
    // body('name', 'Genre name must contain at least 30 characters').trim().isLength({ min: 3 }).escape(),
  // Validate that the name field is not empty.
  body('name', 'Genre name required').isLength({ min: 1 }).trim(),

  // Sanitize (trim and escape) the name field.
  sanitizeBody('name').trim().escape(),
    (req, res, next)=>{
        const errors = validationResult(req);

        var genre = new Genre({name: req.body.name})


        if(!errors.isEmpty()){
            res.render('genre_form', { title: 'Create Genre', genre: genre, errors: errors.array()});
            return;
        }else{

            // 检查是否已存在
            Genre.findOne({'name': req.body.name})
            .exec(function(err, found_genre){
                if(err) {return next(err)}

                if(found_genre){
                    res.redirect(found_genre.url)
                }else{
                    genre.save(function(err){
                        if(err){return next(err)}
                        res.redirect(genre.url)
                    })
                }
            })
        }

    }
]