/**
 * @desc Subtracts Years from Date
 * @param {Date} date 
 * @param {Number} years 
 * @returns {Date} Date
 */
export default function subtractYears(date, years) {
    date.setFullYear(date.getFullYear() - years);
    return date;
  }
