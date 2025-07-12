import { Request, Response, RequestHandler, NextFunction } from 'express';
import { expressjwt as jwt } from 'express-jwt';
import config from '@/config';
import { Algorithm } from 'jsonwebtoken';
import blacklistedToken from '@/models/blacklistedToken';

export const getTokenFromHeader = (req: Request): string | undefined => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.split(' ')[1];
  }
  return undefined;
}

const checkBlacklistToken = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    console.log('Checking token in blacklist...');

    const token = getTokenFromHeader(req);

    if (token) {
      // Verificar si el token está en blacklist
      const isBlacklist = await blacklistedToken.findOne({ token });
      console.log(`Token ${token} is in blacklist: ${isBlacklist ? 'yes' : 'no'}`);
      
      // Si el token está en blacklist, retornar error 401

      if (isBlacklist) {
        return res.status(401).json({ error: 'Token has been invalidated' });
      }
    }
    
    next();
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    } else {
      return res.status(500).json({ error: 'An unexpected error occurred' });
    }
  }
};

// ✅ Usar express-jwt directamente (sin custom middleware)
const jwtMiddleware: RequestHandler = jwt({
  secret: config.jwtSecret,
  algorithms: ['HS256' as Algorithm],
  requestProperty: 'auth',
  getToken: getTokenFromHeader,
});

const isAuth: RequestHandler[] = [jwtMiddleware, checkBlacklistToken];

export default isAuth;