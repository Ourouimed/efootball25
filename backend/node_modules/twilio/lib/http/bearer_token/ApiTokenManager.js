"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const token_1 = require("../../rest/iam/v1/token");
const IamBase_1 = __importDefault(require("../../rest/IamBase"));
const V1_1 = __importDefault(require("../../rest/iam/V1"));
const NoAuthCredentialProvider_1 = __importDefault(require("../../credential_provider/NoAuthCredentialProvider"));
const BaseTwilio_1 = require("../../base/BaseTwilio");
class ApiTokenManager {
    constructor(params) {
        this.params = params;
    }
    getParams() {
        return this.params;
    }
    async fetchToken() {
        const noAuthCredentialProvider = new NoAuthCredentialProvider_1.default.NoAuthCredentialProvider();
        const client = new BaseTwilio_1.Client();
        client.setCredentialProvider(noAuthCredentialProvider);
        const tokenListInstance = (0, token_1.TokenListInstance)(new V1_1.default(new IamBase_1.default(client)));
        return tokenListInstance
            .create(this.params)
            .then((token) => {
            return token.accessToken;
        })
            .catch((error) => {
            throw new Error(`Error Status Code: ${error.status}\nFailed to fetch access token: ${error.message}`);
        });
    }
}
exports.default = ApiTokenManager;
