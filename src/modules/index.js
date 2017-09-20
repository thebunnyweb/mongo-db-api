import userRoutes from './users/users.routes';
import postRoutes from './posts/post.routes'
export default app=>{
    app.use('/api/', userRoutes);
    app.use('/api/', postRoutes);
}
