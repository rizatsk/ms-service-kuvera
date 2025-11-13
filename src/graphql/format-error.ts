import logger from "../config/logger";

const customFormatErrorGraphQl = (formattedError: any) => {
  const error = formattedError.message;

  if (error === '40104' || '40101') {
    return {
      message: 'unauthenticated',
      statusCode: error,
    }
  };
  
  return {
    message: 'internal server error',
    statusCode: error,
  };
};

export default customFormatErrorGraphQl;
