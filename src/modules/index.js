import userRoutes from './users/users.routes';
import postRoutes from './posts/post.routes';
import { authJwt } from '../services/auth.services';

export default app => {
  app.use('/api/', userRoutes);
  app.use('/api/', postRoutes); 
};
