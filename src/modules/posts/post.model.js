import mongoose, {Schema} from 'mongoose';
import validator from 'validator';
import uniqueValidator from 'mongoose-unique-validator'
import slug from 'slug';

const postSchema = new Schema({
    title:{
        type: String,
        required: [true, 'Title of post is required'],
        trim: true,
        unique: true,
    },
    text:{
        type: String,
        required: [true, 'Title of post is required'],
        trim: true,
        minlength: [6, 'Description should be atleast 6 characters long']
    },
    author:{
        type: String,
        required: [true, 'Author of post is required'],
        trim: true,
    },
    genre:{
        type: String,
        trim: true,
    },
    slug:{
        type: String,
        trim: true,
        lowercase: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {timestamps: true});


postSchema.index({'$**':'text'});


postSchema.plugin(uniqueValidator,{
    message: '{VALUE} already exists !'
});


postSchema.pre('validate',function(next){
    this._slulify();
    next();
})

postSchema.methods = {
    _slulify(){
       this.slug = slug(this.title);
    },
    toJSON()
    {
        return {
            _id: this._id,
            title: this.title,
            text: this.text,
            author: this.author,
            genre: this.genre,
            slug: this.slug,
            user: this.user
        }
    },
}

postSchema.statics = {
    createpost(args, user){
        return this.create({
            ...args,
            user
        })
    },
    postlist(limit, skip, q){
        if(q==""){
            return this.find()
                .sort({createdAt: -1})
                .limit(limit)
                .skip(skip)
        }else{
           return this.find({$text: {$search: q}})
           .sort({createdAt: -1})
           .skip(0)
           .limit(null) 
        }
    }
}


export default mongoose.model('Post', postSchema)