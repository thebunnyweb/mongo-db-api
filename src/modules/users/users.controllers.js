import User from './users.model';
import HTTPStatus from 'http-status';

export async function signup( req, res ){
    try {
        const user = await User.create(req.body)
        res.status(HTTPStatus.CREATED).json(user)
    } catch (error) {
        res.status(HTTPStatus.BAD_REQUEST).json(error)
    }
}

export async function login(req, res, next){
    res.status(HTTPStatus.OK).json(req.user.toAuthJSON());
    return next();
}

export async function getusers(req, res){

    const limit = parseInt(req.query.limit, 0) || 0;
    const skip = parseInt(req.query.skip, 0) || 0;
    const q = req.query.q || "";
    try {
        const userdata = await User.listallusers(limit, skip, q);
        res.status(HTTPStatus.OK).json(userdata)
    } catch (e) {
        res.status(HTTPStatus.BAD_REQUEST).json(e)
    }
}