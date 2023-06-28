const validatePort = (input: string): boolean | string => {
  const port = parseInt(input, 10);
  if (isNaN(port) || port < 1 || port > 65535 || input !== port.toString()) {
    return 'Please enter a valid port number (1-65535).';
  }
  return true;
};


export { validatePort }


