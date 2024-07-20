import mongoose from 'mongoose'


const CommentSchema = mongoose.Schema({
    "author":{
        type: String,
        required: true
    },
    "comment": {
        type: String,
        required: true
    }
})

const Comment = mongoose.model("Comment", CommentSchema)

const PostSchema = mongoose.Schema({
    "title": {
        type: String,
        required: true,
    },
    "content": {
        type: String,
        required: true,
    },
    "comments": {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }
})

const Post = mongoose.model("Post", PostSchema);


const createPost = async () => {
    const comment1 = new Comment({ author: 'Munga', comment: "lalalala"})
    const comment2 = new Comment({ author: "lalal", comment:"shalala" })

    await comment1.save();
    await comment2.save();

    const post = new Post({
        title: "Skadabadoomp", 
        content: "someome someos somdoe somdoe aomekalahdlcna",
        comments: [comment1, comment2]
        
    })
    await post.save();
    return post
    
}

createPost()































