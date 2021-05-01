const DONE_FILE = 2;

const imageHandler = (e, setImage) => {
  // eslint-disable-next-line no-undef
  const reader = new FileReader();
  reader.onload = () => {
    if (reader.readyState === DONE_FILE) {
      setImage(reader.result);
    }
  };
  reader.readAsDataURL(e.target.files[0]);
};

export default imageHandler;
