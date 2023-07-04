import SgidClient from "@opengovsg/sgid-client";

const clientUrl = process.env.CLIENT_URL as string;
const loginRedirectPath = process.env.LOGIN_REDIRECT_PATH as string;

const clientConfig = {
  clientId: process.env.SGID_CLIENT_ID as string,
  clientSecret: process.env.SGID_CLIENT_SECRET as string,
  privateKey: process.env.SGID_PRIVATE_KEY as string,
  redirectUri: clientUrl + loginRedirectPath,
};

const client = new SgidClient(clientConfig);

export default client;
