declare global {
  namespace Express {
    interface User extends userPayloadType {}
  }
}

export interface userPayloadType {
  id: string;
  name: string;
  workspaceId: string;
  email: string;
}
