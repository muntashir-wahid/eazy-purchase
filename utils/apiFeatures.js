class APIFeatures {
  constructor(query, queryObject) {
    this.query = query;
    this.queryObject = queryObject;
  }

  // Filter
  filter() {
    const queryObjCopy = { ...this.queryObject };

    // Exclude special fields from the query object
    const excludedFields = ["search", "sort", "fields", "page", "limit"];
    excludedFields.forEach((field) => {
      delete queryObjCopy[field];
    });

    // Build advance query string
    let queryStr = JSON.stringify(queryObjCopy);
    queryStr = queryStr.replace(/\b(lt|lte|gt|gte)\b/g, (str) => `$${str}`);

    // Build the query for filters
    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  // Search
  search(searchingFor = "name") {
    if (this.queryObject.search) {
      this.query = this.query.find({
        [searchingFor]: {
          $regex: ".*" + this.queryObject.search + ".*",
          $options: "i",
        },
      });
    }

    return this;
  }

  // Projection
  project() {
    if (this.queryObject.fields) {
      const fields = this.queryObject.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }
    return this;
  }

  // Sort
  sort() {
    if (this.queryObject.sort) {
      const sortBy = this.queryObject.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);

      return this;
    }
  }

  // Paginate
  paginate() {
    const page = this.queryObject.page * 1 || 1;
    const limit = this.queryObject.limit * 1 || 10;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = APIFeatures;
