import { config } from "@/config/config";

const constants = {
  getAvatar: (profileUrl) => {
    return profileUrl || `${config.clientUrl}/src/assets/images/avatar.jfif`;
  },
};

export { constants };
