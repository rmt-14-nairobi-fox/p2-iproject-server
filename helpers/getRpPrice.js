const getRpPrice = (price) => {
  return "Rp. " + price.toLocaleString("id") + ",00";
};

module.exports = getRpPrice;
