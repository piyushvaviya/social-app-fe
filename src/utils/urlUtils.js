const getParams = (paramsKey) => {
  const params = new URLSearchParams(window.location.search);
  const paramsValue = params.get(paramsKey);
  if (isNaN(paramsValue)) return false;

  return +paramsValue;
};

export { getParams };
