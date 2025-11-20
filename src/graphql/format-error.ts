const customFormatErrorGraphQl = (formattedError: any) => {
  const error = formattedError.message;

  if (error === '40104' || error === '40101') {
    return {
      message: 'unauthenticated',
      statusCode: error,
    }
  };
  
  return {
    message: 'Error',
    statusCode: error,
  };
};

export default customFormatErrorGraphQl;
