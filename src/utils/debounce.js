const debounce = (fn, wait) => {
  let timeId = null;
  return (...args) => {
    clearTimeout(timeId);
    timeId = setTimeout(() => {
      fn.apply(this, [...args]);
    }, wait);
  };
};

export default debounce;
