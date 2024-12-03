const excludedParams = ["perPage", "startPage", "minPrice", "maxPrice", "sort"];

module.exports = function filterParser(filtersQueryString) {
  const mongooseQuery = {};

  if (filtersQueryString.minPrice && filtersQueryString.maxPrice) {
    mongooseQuery.currentPrice = {
      $gte: Number(filtersQueryString.minPrice),
      $lte: Number(filtersQueryString.maxPrice),
    };
  }

  if (filtersQueryString.colors) {
    mongooseQuery["colors.color"] = {
      $in: filtersQueryString.colors
    }
  }

  return Object.keys(filtersQueryString).reduce(
    (mongooseQuery, filterParam) => {
      if (filterParam === "colors") return mongooseQuery;
      if (filtersQueryString[filterParam].includes(",")) {
        mongooseQuery[filterParam] = {
          $in: filtersQueryString[filterParam]
            .split(",")
            .map((item) => decodeURI(item)),
        };
      } else if (!excludedParams.includes(filterParam)) {
        mongooseQuery[filterParam] = decodeURI(filtersQueryString[filterParam]);
      }

      return mongooseQuery;
    },
    mongooseQuery
  );
};
