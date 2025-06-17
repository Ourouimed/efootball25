import TokenManager from "./TokenManager";
import { TokenListInstanceCreateOptions } from "../../rest/iam/v1/token";
export default class OrgsTokenManager implements TokenManager {
    private readonly params;
    constructor(params: TokenListInstanceCreateOptions);
    getParams(): TokenListInstanceCreateOptions;
    fetchToken(): Promise<string>;
}
