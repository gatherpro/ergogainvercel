import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // Google認証成功時
      if (account?.provider === "google" && user.email) {
        // Shopify連携はクライアント側で処理
        return true;
      }
      return false;
    },
    async redirect({ url, baseUrl }) {
      // ログイン後は /account へリダイレクト
      if (url.startsWith(baseUrl)) return url;
      return `${baseUrl}/account`;
    },
    async session({ session, token }) {
      // セッションにユーザー情報を追加
      if (token && session.user) {
        session.user.email = token.email;
        session.user.name = token.name;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
