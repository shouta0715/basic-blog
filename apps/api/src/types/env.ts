import { auth } from "@/lib/auth";

type Variables = {
  user: typeof auth.$Infer.Session.user;
  session: typeof auth.$Infer.Session.session;
};

export type Env = {
  Variables: Variables;
};
