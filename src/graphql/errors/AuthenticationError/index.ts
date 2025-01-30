import { GraphQLError } from "graphql";

class AuthenticationError extends GraphQLError {
  constructor() {
    super("Authentication required");
  }
}

export default AuthenticationError;
