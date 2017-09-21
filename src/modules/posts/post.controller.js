import Post from './post.model';
import HTTPStatus from 'http-status';
import User from '../users/users.model';

export async function createpost(req, res){
    console.log(req.body);
    try {
        const post = await Post.createpost(req.body, req.user._id);
        res.status(HTTPStatus.CREATED).json(post);
    } catch (e) {
        res.status(HTTPStatus.BAD_REQUEST).json(e);
    }
}

export async function updatepost (req, res) {
    try {
        const post  = await Post.findById(req.params.id);
        Object.keys(req.body).forEach(key=>{
            post[key] = req.body[key]
        });
        return res.status(HTTPStatus.OK).json(await post.save());
    } catch (e) {
        res.status(HTTPStatus.BAD_REQUEST).json(e);
    }
}


export async function listpost(req, res){
    const limit = parseInt(req.query.limit, 0) || 0;
    const skip =  parseInt(req.query.skip, 0) || 0;
    const q = req.query.q || "" ;
    try {
        const postlist = await Post.postlist(limit, skip, q).populate('user', '_id email');
        return res.status(HTTPStatus.OK).json(postlist);
    } catch (e) {
        res.status(HTTPStatus.BAD_REQUEST).json(e);
    }
}