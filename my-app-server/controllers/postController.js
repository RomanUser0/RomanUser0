import postModel from "../models/post.js"

export const remove = async (req, res) => {
    try {
        const postId = req.params.id

        postModel.findOneAndDelete({
            _id: postId
        }, (err, doc) => {
            if(err) {
                console.log(err)
                return res.status(500).json({
                    message: 'Не удалось удалить статью'
                })
            }

            if(!doc) {
                return res.status(404).json({
                    message: 'Статья не найдена'
                })
            }

            res.json({
                success: true
            })
        })
    } catch (err) {

    }
}

export const getAll = async (req, res) => {
    try {
        const posts = await postModel.find().populate('user').exec()

        res.json(posts)
    } catch (err) {
        res.status(500).json({
            message: 'Не удалось получить статьи'
        })
    }
}

export const getOne = async (req, res) => {
    try {
        const postId = req.params.id

        postModel.findByIdAndUpdate(
            {
            _id: postId,
            },
            {
                $inc: {viewsCount: 1}
            },
            {
                returnDocument: 'after'
            },
                (err, doc) => {
                    if (err) {
                        console.log(err)
                        return res.status(500).json({
                            message: 'Не удалось вернуть статью'
                        })
                    }

                    if(!doc) {
                        return res.status(404).json({
                            message: 'Статья не найдена'
                        })
                    }

                    res.json(doc)
                }
        )
    } catch (err) {
        res.status(500).json({
            message: 'Не удалось получить статьи'
        })
    }
}

export const create = async (req, res) => {
    try {
        const doc = new postModel({
            title: req.body.title,
            text: req.body.title,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId,
        })

        const post = await doc.save()

        res.json(post)
        
    } catch (err) {
        res.status(500).json({
            message: 'Не удалось создать статью'
        })

    }
}

export const update = async (req, res) => {
    try {
        const postId = req.params.id

        await postModel.updateOne(
            {
                _id: postId
            },
            {
                title: req.body.title,
                text: req.body.title,
                imageUrl: req.body.imageUrl,
                tags: req.body.tags,
                user: req.userId,
            },
        )
        res.json({
            success: true
        })

    } catch (err) {
        res.status(500).json({
            message: 'Не удалось обновить статью'
        })
    }
}