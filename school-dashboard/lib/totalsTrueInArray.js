export default function totalsTrueInArray(array, dataToCheck) {
  return array.map((item) => {
    const totals = dataToCheck.reduce((total, single) => {
      const included = single[item] === true;
      return total + (included ? 1 : 0);
    }, 0);
    return { item, totals };
  });
}
