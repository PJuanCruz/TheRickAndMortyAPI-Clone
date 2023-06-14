import Database from './../database/index.js';
import { ITEMS_PER_PAGE } from '../helpers/constants/index.js';

class Service {
  constructor() {
    this.database = new Database();
    this.basePath = `${process.env.HOST}/api`;
    this.route;
    this.itemsPerPage = ITEMS_PER_PAGE;
  }

  _getInfo(currentPage, rowsCount, queryParams) {
    const page = parseInt(currentPage);
    const count = parseInt(rowsCount);
    const pages = Math.ceil(count / this.itemsPerPage);

    let params = '';
    for (const queryParam in queryParams) {
      if (queryParams[queryParam]) {
        params += `&${queryParam}=${queryParams[queryParam]}`;
      }
    }

    const next = pages > page
        ? `${this.basePath}/${this.route}?page=${page + 1}${params}`
        : null;
    const prev = page > 1
        ? `${this.basePath}/${this.route}?page=${page - 1}${params}`
        : null;

    return { count, pages, next, prev };
  }
}

export default Service;
