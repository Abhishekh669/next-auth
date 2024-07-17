export function isNumeric(str : any) {
  // Regular expression to match only digits from 0 to 9
  const numericRegex = /^[0-9]+$/;

  // Test the input string against the regular expression
  return numericRegex.test(str);
}


