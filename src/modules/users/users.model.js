import mongoose, {Schema} from 'mongoose';
import validator from 'validator';
import uniqueValidator from 'mongoose-unique-validator';
import {hashSync, compareSync} from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';
import constants from '../../config/constants';

const userSchema =  new Schema({
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is required'],
        trim: true,
        validate: {
            validator(email){
                return validator.isEmail(email)
            },
            message: '{VALUE} is not a valid email'
        }
    },
    firstname: {
        type: String,
        required: [true, 'Firstname is required'],
        trim: true
    },
    lastname: {
        type: String,
        required: [true, "Lastname is required"],
        trim: true
    },
    username: {
        type: String,
        required: [true, "Username is required"],
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength:[6, 'Password should be more than 6'],
        trim: true
    }
},{timestamps: true});


userSchema.index({'$**': 'text'});

userSchema.pre('save',function(next){
    if(this.isModified('password')){
        this.password = this._hashpassword(this.password)
        return next();
    }
    return next();
})

userSchema.methods = {
    _hashpassword(password){
        return hashSync(password)
    },
    authenticateUser(password){
       return compareSync(password,this.password)
    },
    createToken(){
        return jwt.sign(
                {
                    _id: this._id
                },
                constants.JWT_SECRET
            )
    },
    toJSON(){
        return {
            _id: this._id,
            token: `JWT ${this.createToken()}`,
            email: this.email,
            username: this.username,
            firstname: this.firstname,
            lastname: this.lastname
        }
    }
};


userSchema.statics = {
    listallusers(limit, skip, q){
        if(q=="")
        {
            return this.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
        }else{
            return this.find({$text: {$search: q }})
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
        }        
    },
}

userSchema.plugin(uniqueValidator, {
    message: '{VALUE} already exists'
})


export default mongoose.model('User', userSchema)
