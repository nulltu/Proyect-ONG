/* eslint-disable no-plusplus */
/* eslint-disable no-undef */

const base64ToRawFile = (fileSrc, fileName) => {
  const arr = fileSrc.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], fileName, { type: mime });
};

export default base64ToRawFile;
