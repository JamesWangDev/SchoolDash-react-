export default function totalsFromArray(wordList, field, entries) {
  const totalPerClass = wordList.map((word) => {
    const total = entries.reduce((total, single) => {
      const included = single[field] === word;
      return total + (included ? 1 : 0);
    }, 0);
    return { word, total };
  });
  //   console.log(totalPerClass);
  return totalPerClass;
}
