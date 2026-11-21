import RequestService from "./request.service";
import { AppError } from "./error.service";
import { getOlaiiOptions } from "../options";

const UserService = {
  /**
   * Profile of the logged in user: { id, first_name, last_name, email, profile: { role, allow_*, is_staff, ... } }
   * @throws AppError
   */
  async getUserProfile() {
    try {
      return await RequestService.customRequest({
        method: "get",
        url: getOlaiiOptions().authURL + "api/v2/account/",
      });
    } catch (error) {
      throw new AppError(error);
    }
  },
};

export default UserService;
