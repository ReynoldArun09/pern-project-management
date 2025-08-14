import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as LocalStrategy } from 'passport-local';
import { parsedEnvVariables } from './appConfig';
import { Request } from 'express';
import {
  loginOrCreateAccountService,
  verifyUserService,
} from '../services/authService';
import { NotFoundException } from '../utils/customError';
import { prisma } from '../lib/prisma';

passport.use(
  new GoogleStrategy(
    {
      clientID: parsedEnvVariables.GOOGLE_CLIENT_ID,
      clientSecret: parsedEnvVariables.GOOGLE_CLIENT_SECRET,
      callbackURL: parsedEnvVariables.GOOGLE_CALLBACK_URL,
      passReqToCallback: true,
      scope: ['profile', 'email'],
    },
    async (req: Request, accessToken, refreshToken, profile, done) => {
      try {
        const { email, sub: googleId, picture } = profile._json;
        if (!googleId) {
          throw new NotFoundException('Google Id is missing.');
        }
        const { user } = await loginOrCreateAccountService({
          provider: 'GOOGLE',
          providerId: googleId,
          displayName: profile.displayName,
          picture,
          email,
        });
        done(null, {
          id: user.id,
          name: user.name,
          email: user.email,
          workspaceId: user.currentWorkspaceId || '',
        });
      } catch (error) {
        done(error, false);
      }
    },
  ),
);

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      session: true,
    },
    async (email, password, done) => {
      try {
        const user = await verifyUserService({ email, password });
        done(null, {
          id: user.id,
          name: user.name,
          email: user.email,
          workspaceId: user.currentWorkspaceId || '',
        });
      } catch (error: any) {
        done(error, false, { message: error?.message });
      }
    },
  ),
);

passport.serializeUser((user: Express.User, done) => done(null, user.id));
passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        currentWorkspaceId: true,
      },
    });

    if (!user) return done(null, false);
    done(null, {
      id: user.id,
      name: user.name,
      email: user.email,
      workspaceId: user.currentWorkspaceId || '',
    });
  } catch (error) {
    done(error, null);
  }
});
