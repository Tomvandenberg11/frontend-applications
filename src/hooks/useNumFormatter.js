const useNumFormatter = (num) => {
  // refactoring numbers
  if (num > 1000000000) {
    return (num / 10000000).toFixed(0) + " billion"
  } else {
    return (num / 1000000).toFixed(0) + " million"
  }
}

export default useNumFormatter
