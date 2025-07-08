export const success = (statusCode: number, result: any) => {
  return {
    status: "ok",
    statusCode,
    result,
  };
};

export const error = (statusCode: number, message: string) => {
  return {
    status: "error",
    statusCode,
    message,
  };
};

