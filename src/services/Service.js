import Database from './../database/index.js';
import { ITEMS_PER_PAGE } from '../helpers/constants/index.js';

class Service {
  constructor() {
    this.database = new Database();
    this.basePath = `${process.env.HOST}/api`;
    this.route;
    this.itemsPerPage = ITEMS_PER_PAGE;
  }

  /**
   * Calculates pagination information based on the current page, rows count, and query parameters.
   *
   * @param {string} currentPage - Current page number.
   * @param {string} rowsCount - Total number of rows.
   * @param {Object} queryParams - Query parameters object.
   * @returns {Object} - Pagination Info object.
   */
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

    const next =
      pages > page
        ? `${this.basePath}/${this.route}?page=${page + 1}${params}`
        : null;
    const prev =
      page > 1
        ? `${this.basePath}/${this.route}?page=${page - 1}${params}`
        : null;

    return { count, pages, next, prev };
  }

  _throwError({ status, message }) {
    const error = new Error();
    error.status = status;
    error.message = message;

    throw error;
  }
}

export default Service;
