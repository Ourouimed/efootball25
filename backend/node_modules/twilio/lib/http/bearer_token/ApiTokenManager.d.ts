import TokenManager from "./TokenManager";
import { TokenListInstanceCreateOptions } from "../../rest/iam/v1/token";
export default class ApiTokenManager implements TokenManager {
    private params;
    constructor(params: TokenListInstanceCreateOptions);
    getParams(): TokenListInstanceCreateOptions;
    fetchToken(): Promise<string>;
}
