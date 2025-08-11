declare global {
  namespace Express {
    interface Request {
      ctx: userPayloadType;
    }
  }
}

export type userPayloadType = {
  id: string;
  name: string;
  workspaceId: string;
  email: string;
};
