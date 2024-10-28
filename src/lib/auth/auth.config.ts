export const authConfig = {
  pages: {
    signIn: "/login",
  },
  providers: [],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        const [name, lastName] = user.name.split(" ");
        token.id = user.id;
        token.image = user.image;
        token.name = name;
        token.lastName = lastName || token.lastName;
        token.phone = user.phone;
        token.roles = user.roles;
        token.google = user.google;
        token.shoppingCart = user.shoppingCart;
        token.status = user.status;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (token) {
        session.user.id = token.id;
        session.user.image = token.image;
        session.user.name = token.name;
        session.user.lastName = token.lastName;
        session.user.phone = token.phone;
        session.user.roles = token.roles;
        session.user.google = token.google;
        session.user.shoppingCart = token.shoppingCart;
        session.user.status = token.status;
      }
      return session;
    },

    authorized({ auth, request }: any) {
      const user = auth?.user;
      const isUserActive = user?.status ?? true;

      const isOnLoginPage = request.nextUrl?.pathname.startsWith("/login");
      const isOnLogOutPage = request.nextUrl?.pathname.startsWith("/logout");
      const isOnSignupPage = request.nextUrl?.pathname.startsWith("/signup");
      const isOnUserPage = request.nextUrl?.pathname.startsWith("/usuario");
      const isOnCheckoutPage =
        request.nextUrl?.pathname.startsWith("/tienda/checkout");
      const isOnInactivePage =
        request.nextUrl?.pathname.startsWith("/desactivado");
      const isInMainPage = request.nextUrl?.pathname.startsWith("/");

      // ONLY ACTIVE USERS CAN REACH THE MAIN PAGE
      if (
        isInMainPage &&
        !isUserActive &&
        !isOnInactivePage &&
        !isOnLogOutPage
      ) {
        return Response.redirect(new URL("/desactivado", request.nextUrl));
      }

      // //ONLY INACTIVE USERS CAN REACH THE INACTIVE PAGE
      // if (isOnInactivePage && !isUserActive) {
      //   return Response.redirect(new URL("/", request.nextUrl));
      // }

      // ONLY AUTHENTICATED USERS CAN REACH THE USER PAGE
      if (isOnUserPage && !user) {
        return Response.redirect(new URL("/login", request.nextUrl));
      }

      // ONLY AUTHENTICATED USERS CAN REACH THE CHECKOUT PAGE
      if (isOnCheckoutPage && !user) {
        return Response.redirect(new URL("/login", request.nextUrl));
      }

      // ONLY UNAUTHENTICATED USERS CAN REACH THE LOGIN PAGE
      if (isOnLoginPage && user) {
        return Response.redirect(new URL("/", request.nextUrl));
      }

      // ONLY UNAUTHENTICATED USERS CAN REACH THE SIGNUP PAGE
      if (isOnSignupPage && user) {
        return Response.redirect(new URL("/", request.nextUrl));
      }

      return true;
    },
  },
};
