let setLoadingFn = null;

export const loaderControl = {
  register(fn) {
    setLoadingFn = fn;
  },
  show() {
    if (setLoadingFn) setLoadingFn(true);
  },
  hide() {
    if (setLoadingFn) setLoadingFn(false);
  }
};
