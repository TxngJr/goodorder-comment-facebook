import numeral from 'numeral';
const SI_SYMBOL = ['', 'k', 'M', 'G', 'T', 'P', 'E'];

export function abbreviateNumber(number: number, digits: number = 0): string {
  // what tier? (determines SI symbol)
  const tier = (Math.log10(Math.abs(number)) / 3) | 0;

  // if zero, we don't need a suffix
  if (tier === 0) return numeral(number).format('0,0') + '';

  // get suffix and determine scale
  const suffix = SI_SYMBOL[tier];
  const scale = Math.pow(10, tier * 3);

  // scale the number
  const scaled = number / scale;

  // format number and add suffix
  return numeral(scaled.toFixed(digits)).format('0,0') + suffix;
}
