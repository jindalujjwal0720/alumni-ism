const ones = [
  '',
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
];
const teens = [
  '',
  'eleven',
  'twelve',
  'thirteen',
  'fourteen',
  'fifteen',
  'sixteen',
  'seventeen',
  'eighteen',
  'nineteen',
];
const tens = [
  '',
  'ten',
  'twenty',
  'thirty',
  'forty',
  'fifty',
  'sixty',
  'seventy',
  'eighty',
  'ninety',
];
const thousands = ['', 'thousand', 'million', 'billion'];

const convertHundreds = (num: number): string => {
  let result = '';
  if (num >= 100) {
    result += ones[Math.floor(num / 100)] + ' hundred ';
    num %= 100;
  }
  if (num >= 11 && num <= 19) {
    result += teens[num - 10] + ' ';
  } else {
    result += tens[Math.floor(num / 10)] + ' ';
    result += ones[num % 10] + ' ';
  }
  return result.trim();
};

export const amountToWords = (amount: number): string => {
  if (amount === 0) return 'zero';

  let word = '';
  let i = 0;

  while (amount > 0) {
    if (amount % 1000 !== 0) {
      word = convertHundreds(amount % 1000) + ' ' + thousands[i] + ' ' + word;
    }
    amount = Math.floor(amount / 1000);
    i++;
  }

  return word.trim();
};
