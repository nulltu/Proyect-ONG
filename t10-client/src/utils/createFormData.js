const createFormData = (data) => {
  // eslint-disable-next-line no-undef
  const formData = new FormData();
  Object.keys(data).forEach((key) => {
    formData.append(key, data[key]);
  });
  return formData;
};

export default createFormData;
