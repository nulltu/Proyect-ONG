const pagination = {
  page: (page, limit) => {
    let offset;
    let newLimit = +limit;

    if (limit < 1 || Number.isNaN(newLimit)) {
      newLimit = 10;
    }
    if (page <= 1 || Number.isNaN(+page)) {
      offset = 0;
    } else {
      offset = (page - 1) * limit;
    }

    return {
      limit: newLimit,
      offset,
    };
  },
  links: (actualPage, limit, count, route) => {
    let page = +actualPage;
    if (Number.isNaN(page)) {
      page = 0;
    }
    const links = {};
    links.first = `${route}?limit=${limit}`;
    if (page > 1) {
      links.prev = `${route}?page=${page - 1}&limit=${limit}`;
    }
    if (limit * page < count) {
      links.next = `${route}?page=${page + 1}&limit=${limit}`;
    }
    links.last = `${route}?page=${Math.ceil(count / limit)}&limit=${limit}`;

    return links;
  },
};

module.exports = pagination;
