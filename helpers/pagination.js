function getPagingData (data, page, limit){
  const { count: totalItems, rows: stories } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, stories, totalPages, currentPage };
};

module.exports = {getPagingData}