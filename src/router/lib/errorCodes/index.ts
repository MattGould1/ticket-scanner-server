export const error500 = () => {
  return {
    status: 500,
    body: { error: "Internal ServerError" },
  };
};
