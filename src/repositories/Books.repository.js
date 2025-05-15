import ApiGateway from "../shared/ApiGateway";
import { VIEW_MODE } from '../shared';

export const REST_API_CODES = Object.freeze({
  OK: "ok",
  // ...
});

export class BooksRepository {
  constructor() {
    this.httpGateway = new ApiGateway();
  }

  getBooks = async (privateMode) => await this.httpGateway.get(`/${privateMode ? VIEW_MODE.PRIVATE : ""}`);

  addBook = async ({ name, author }) => {
    const bookAddDto = await this.httpGateway.post("/", { name, author });
    return bookAddDto?.status === REST_API_CODES.OK;
  };
}
