const customFormatErrorGraphQl = (formattedError: any, error: any) => {
  return {
    message: formattedError.message,
    code: formattedError.extensions?.code,
  };
};

export default customFormatErrorGraphQl;
