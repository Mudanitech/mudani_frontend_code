
/**
 * Returns the new filtered array with highlighted parts.
 * @param data {Array<Object>} - The collection to iterate over.
 * @param inputValue {string} - The input value.
 * @return {Array} - Returns the new filtered array.
 */
export const filterByNames = (data, inputValue) => {
  // Create a dynamic regex expression object with ignore case sensitivity
  const re = new RegExp(inputValue.toUpperCase());
  // clone the original data deeply
  // as we need to modify the array while iterating it
  //const clonedData = _.cloneDeep(data);
  const results = data.filter((object) => {
    // use filter instead of some
    // to make sure all items are checked
    // first check object.list and then check object.name
    // to avoid skipping list iteration when name matches
    return object.popularStock.filter((item) => {
      if (re.test(item.symbol)) {
        // Calculates the characters to highlight in text based on query
        const matches = item.symbol.toUpperCase()===inputValue.toUpperCase();
        // Breaks the given text to parts based on matches.

        console.log('Search Data'+matches)
        // After that create a new property named `parts` and assign an array to it.
        //item["parts"] = JSON.parse(item.companyName, matches);
        return true;
      } else {
        return false;
      }
    }).length > 0 || re.test(object.symbol);
  });
  return results;
};
