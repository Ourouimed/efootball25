/// <reference types="node" />
import { inspect, InspectOptions } from "util";
import Page, { TwilioResponsePayload } from "../../../base/Page";
import Response from "../../../http/response";
import V2 from "../V2";
/**
 * The Status of this Sender. One of `CREATING`, `ONLINE`, `OFFLINE`, `PENDING_VERIFICATION`, `VERIFYING` or `ONLINE:UPDATING`.
 */
export type ChannelsSenderStatus = "CREATING" | "ONLINE" | "OFFLINE" | "PENDING_VERIFICATION" | "VERIFYING" | "ONLINE:UPDATING" | "STUBBED";
/**
 * Configuration settings for creating a sender, e.g., {\"waba_id\": \"1234567890\", \"verification_method\": \"sms\"}
 */
export declare class MessagingV2ChannelsSenderConfiguration {
    /**
     * The ID of the WhatsApp Business Account to use for this sender.
     */
    "waba_id"?: string | null;
    /**
     * The method to use for verification. Either \"sms\" or \"voice\".
     */
    "verification_method"?: string | null;
    /**
     * The verification code to use for this sender.
     */
    "verification_code"?: string | null;
    /**
     * The SID of the Twilio Voice application to use for this sender.
     */
    "voice_application_sid"?: string | null;
}
export declare class MessagingV2ChannelsSenderOfflineReasonsItems {
    /**
     * The error code.
     */
    "code"?: string | null;
    /**
     * The error message.
     */
    "message"?: string | null;
    /**
     * The URL to get more information about the error.
     */
    "more_info"?: string | null;
}
/**
 * Sender profile specific configurations, e.g., {\"name\": \"xxx\", \"about\": \"xxx\", \"address\": \"xxx\", \"description\": \"xxx\", \"email\": \"xxx@xxx\", \"logo_url\": \"https://xxx\", \"vertical\": \"xxx\", \"websites\": [\"https://xxx\", \"...\"]}
 */
export declare class MessagingV2ChannelsSenderProfile {
    /**
     * The name of the sender.
     */
    "name"?: string | null;
    /**
     * The about text of the sender.
     */
    "about"?: string | null;
    /**
     * The address of the sender.
     */
    "address"?: string | null;
    /**
     * The description of the sender.
     */
    "description"?: string | null;
    /**
     * The emails of the sender.
     */
    "emails"?: any | null;
    /**
     * The logo URL of the sender.
     */
    "logo_url"?: string | null;
    /**
     * The vertical of the sender. Allowed values are: - \"Automotive\" - \"Beauty, Spa and Salon\" - \"Clothing and Apparel\" - \"Education\" - \"Entertainment\" - \"Event Planning and Service\" - \"Finance and Banking\" - \"Food and Grocery\" - \"Public Service\" - \"Hotel and Lodging\" - \"Medical and Health\" - \"Non-profit\" - \"Professional Services\" - \"Shopping and Retail\" - \"Travel and Transportation\" - \"Restaurant\" - \"Other\"
     */
    "vertical"?: string | null;
    /**
     * The websites of the sender.
     */
    "websites"?: any | null;
}
/**
 * Sender specific additional properties, e.g., {\"quality_rating\": \"HIGH\", \"messaging_limit\": \"10K Customers/24hr\"}
 */
export declare class MessagingV2ChannelsSenderProperties {
    /**
     * The quality rating of the sender.
     */
    "quality_rating"?: string | null;
    /**
     * The messaging limit of the sender.
     */
    "messaging_limit"?: string | null;
}
export declare class MessagingV2ChannelsSenderRequestsCreate {
    /**
     * The ID of this Sender prefixed with the channel, e.g., `whatsapp:E.164`
     */
    "sender_id": string | null;
    "configuration"?: MessagingV2ChannelsSenderConfiguration | null;
    "webhook"?: MessagingV2ChannelsSenderWebhook | null;
    "profile"?: MessagingV2ChannelsSenderProfile | null;
}
export declare class MessagingV2ChannelsSenderRequestsUpdate {
    "configuration"?: MessagingV2ChannelsSenderConfiguration | null;
    "webhook"?: MessagingV2ChannelsSenderWebhook | null;
    "profile"?: MessagingV2ChannelsSenderProfile | null;
}
/**
 * Webhook specific configurations, e.g., {\"callback_url\": \"https://xxx\", \"callback_method\": \"POST\", \"fallback_url\": \"https://xxx\", \"fallback_method\": \"POST\", \"status_callback_url\": \"https://xxx\", \"status_callback_method\": \"POST\"}
 */
export declare class MessagingV2ChannelsSenderWebhook {
    /**
     * The URL to send the webhook to.
     */
    "callback_url"?: string | null;
    /**
     * The HTTP method to use for the webhook. Either \"POST\" or \"PUT\".
     */
    "callback_method"?: string | null;
    /**
     * The URL to send the fallback webhook to.
     */
    "fallback_url"?: string | null;
    /**
     * The HTTP method to use for the fallback webhook. Either \"POST\" or \"PUT\".
     */
    "fallback_method"?: string | null;
    /**
     * The URL to send the status callback to.
     */
    "status_callback_url"?: string | null;
    /**
     * The HTTP method to use for the status callback.
     */
    "status_callback_method"?: string | null;
}
/**
 * Options to pass to update a ChannelsSenderInstance
 */
export interface ChannelsSenderContextUpdateOptions {
    /**  */
    messagingV2ChannelsSenderRequestsUpdate?: MessagingV2ChannelsSenderRequestsUpdate;
}
/**
 * Options to pass to create a ChannelsSenderInstance
 */
export interface ChannelsSenderListInstanceCreateOptions {
    /**  */
    messagingV2ChannelsSenderRequestsCreate: MessagingV2ChannelsSenderRequestsCreate;
}
/**
 * Options to pass to each
 */
export interface ChannelsSenderListInstanceEachOptions {
    /**  */
    channel: string;
    /** How many resources to return in each list page. The default is 50, and the maximum is 1000. */
    pageSize?: number;
    /** Function to process each record. If this and a positional callback are passed, this one will be used */
    callback?: (item: ChannelsSenderInstance, done: (err?: Error) => void) => void;
    /** Function to be called upon completion of streaming */
    done?: Function;
    /** Upper limit for the number of records to return. each() guarantees never to return more than limit. Default is no limit */
    limit?: number;
}
/**
 * Options to pass to list
 */
export interface ChannelsSenderListInstanceOptions {
    /**  */
    channel: string;
    /** How many resources to return in each list page. The default is 50, and the maximum is 1000. */
    pageSize?: number;
    /** Upper limit for the number of records to return. list() guarantees never to return more than limit. Default is no limit */
    limit?: number;
}
/**
 * Options to pass to page
 */
export interface ChannelsSenderListInstancePageOptions {
    /**  */
    channel: string;
    /** How many resources to return in each list page. The default is 50, and the maximum is 1000. */
    pageSize?: number;
    /** Page Number, this value is simply for client state */
    pageNumber?: number;
    /** PageToken provided by the API */
    pageToken?: string;
}
export interface ChannelsSenderContext {
    /**
     * Remove a ChannelsSenderInstance
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed boolean
     */
    remove(callback?: (error: Error | null, item?: boolean) => any): Promise<boolean>;
    /**
     * Fetch a ChannelsSenderInstance
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed ChannelsSenderInstance
     */
    fetch(callback?: (error: Error | null, item?: ChannelsSenderInstance) => any): Promise<ChannelsSenderInstance>;
    /**
     * Update a ChannelsSenderInstance
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed ChannelsSenderInstance
     */
    update(callback?: (error: Error | null, item?: ChannelsSenderInstance) => any): Promise<ChannelsSenderInstance>;
    /**
     * Update a ChannelsSenderInstance
     *
     * @param params - Body for request
     * @param headers - header params for request
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed ChannelsSenderInstance
     */
    update(params: MessagingV2ChannelsSenderRequestsUpdate, headers?: any, callback?: (error: Error | null, item?: ChannelsSenderInstance) => any): Promise<ChannelsSenderInstance>;
    /**
     * Provide a user-friendly representation
     */
    toJSON(): any;
    [inspect.custom](_depth: any, options: InspectOptions): any;
}
export interface ChannelsSenderContextSolution {
    sid: string;
}
export declare class ChannelsSenderContextImpl implements ChannelsSenderContext {
    protected _version: V2;
    protected _solution: ChannelsSenderContextSolution;
    protected _uri: string;
    constructor(_version: V2, sid: string);
    remove(callback?: (error: Error | null, item?: boolean) => any): Promise<boolean>;
    fetch(callback?: (error: Error | null, item?: ChannelsSenderInstance) => any): Promise<ChannelsSenderInstance>;
    update(params?: MessagingV2ChannelsSenderRequestsUpdate | ((error: Error | null, item?: ChannelsSenderInstance) => any), headers?: any, callback?: (error: Error | null, item?: ChannelsSenderInstance) => any): Promise<ChannelsSenderInstance>;
    /**
     * Provide a user-friendly representation
     *
     * @returns Object
     */
    toJSON(): ChannelsSenderContextSolution;
    [inspect.custom](_depth: any, options: InspectOptions): string;
}
interface ChannelsSenderPayload extends TwilioResponsePayload {
    senders: ChannelsSenderResource[];
}
interface ChannelsSenderResource {
    sid: string;
    status: ChannelsSenderStatus;
    sender_id: string;
    configuration: MessagingV2ChannelsSenderConfiguration;
    webhook: MessagingV2ChannelsSenderWebhook;
    profile: MessagingV2ChannelsSenderProfile;
    properties: MessagingV2ChannelsSenderProperties;
    offline_reasons: Array<MessagingV2ChannelsSenderOfflineReasonsItems>;
    url: string;
}
export declare class ChannelsSenderInstance {
    protected _version: V2;
    protected _solution: ChannelsSenderContextSolution;
    protected _context?: ChannelsSenderContext;
    constructor(_version: V2, payload: ChannelsSenderResource, sid?: string);
    /**
     * A 34 character string that uniquely identifies this Sender.
     */
    sid: string;
    status: ChannelsSenderStatus;
    /**
     * The ID of this Sender prefixed with the channel, e.g., `whatsapp:E.164`
     */
    senderId: string;
    configuration: MessagingV2ChannelsSenderConfiguration;
    webhook: MessagingV2ChannelsSenderWebhook;
    profile: MessagingV2ChannelsSenderProfile;
    properties: MessagingV2ChannelsSenderProperties;
    /**
     * Reasons why the sender is offline., e.g., [{\"code\": \"21211400\", \"message\": \"Whatsapp business account is banned by provider {provider_name} | Credit line is assigned to another BSP\", \"more_info\": \"https://www.twilio.com/docs/errors/21211400\"}]
     */
    offlineReasons: Array<MessagingV2ChannelsSenderOfflineReasonsItems>;
    /**
     * The URL of this resource, relative to `https://messaging.twilio.com`.
     */
    url: string;
    private get _proxy();
    /**
     * Remove a ChannelsSenderInstance
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed boolean
     */
    remove(callback?: (error: Error | null, item?: boolean) => any): Promise<boolean>;
    /**
     * Fetch a ChannelsSenderInstance
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed ChannelsSenderInstance
     */
    fetch(callback?: (error: Error | null, item?: ChannelsSenderInstance) => any): Promise<ChannelsSenderInstance>;
    /**
     * Update a ChannelsSenderInstance
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed ChannelsSenderInstance
     */
    update(callback?: (error: Error | null, item?: ChannelsSenderInstance) => any): Promise<ChannelsSenderInstance>;
    /**
     * Update a ChannelsSenderInstance
     *
     * @param params - Body for request
     * @param headers - header params for request
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed ChannelsSenderInstance
     */
    update(params: MessagingV2ChannelsSenderRequestsUpdate, headers?: any, callback?: (error: Error | null, item?: ChannelsSenderInstance) => any): Promise<ChannelsSenderInstance>;
    /**
     * Provide a user-friendly representation
     *
     * @returns Object
     */
    toJSON(): {
        sid: string;
        status: ChannelsSenderStatus;
        senderId: string;
        configuration: MessagingV2ChannelsSenderConfiguration;
        webhook: MessagingV2ChannelsSenderWebhook;
        profile: MessagingV2ChannelsSenderProfile;
        properties: MessagingV2ChannelsSenderProperties;
        offlineReasons: MessagingV2ChannelsSenderOfflineReasonsItems[];
        url: string;
    };
    [inspect.custom](_depth: any, options: InspectOptions): string;
}
export interface ChannelsSenderSolution {
}
export interface ChannelsSenderListInstance {
    _version: V2;
    _solution: ChannelsSenderSolution;
    _uri: string;
    (sid: string): ChannelsSenderContext;
    get(sid: string): ChannelsSenderContext;
    /**
     * Create a ChannelsSenderInstance
     *
     * @param params - Body for request
     * @param headers - header params for request
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed ChannelsSenderInstance
     */
    create(params: MessagingV2ChannelsSenderRequestsCreate, headers?: any, callback?: (error: Error | null, item?: ChannelsSenderInstance) => any): Promise<ChannelsSenderInstance>;
    /**
     * Streams ChannelsSenderInstance records from the API.
     *
     * This operation lazily loads records as efficiently as possible until the limit
     * is reached.
     *
     * The results are passed into the callback function, so this operation is memory
     * efficient.
     *
     * If a function is passed as the first argument, it will be used as the callback
     * function.
     *
     * @param { ChannelsSenderListInstanceEachOptions } [params] - Options for request
     * @param { function } [callback] - Function to process each record
     */
    each(params: ChannelsSenderListInstanceEachOptions, callback?: (item: ChannelsSenderInstance, done: (err?: Error) => void) => void): void;
    /**
     * Retrieve a single target page of ChannelsSenderInstance records from the API.
     *
     * The request is executed immediately.
     *
     * @param { string } [targetUrl] - API-generated URL for the requested results page
     * @param { function } [callback] - Callback to handle list of records
     */
    getPage(targetUrl: string, callback?: (error: Error | null, items: ChannelsSenderPage) => any): Promise<ChannelsSenderPage>;
    /**
     * Lists ChannelsSenderInstance records from the API as a list.
     *
     * If a function is passed as the first argument, it will be used as the callback
     * function.
     *
     * @param { ChannelsSenderListInstanceOptions } [params] - Options for request
     * @param { function } [callback] - Callback to handle list of records
     */
    list(params: ChannelsSenderListInstanceOptions, callback?: (error: Error | null, items: ChannelsSenderInstance[]) => any): Promise<ChannelsSenderInstance[]>;
    /**
     * Retrieve a single page of ChannelsSenderInstance records from the API.
     *
     * The request is executed immediately.
     *
     * If a function is passed as the first argument, it will be used as the callback
     * function.
     *
     * @param { ChannelsSenderListInstancePageOptions } [params] - Options for request
     * @param { function } [callback] - Callback to handle list of records
     */
    page(params: ChannelsSenderListInstancePageOptions, callback?: (error: Error | null, items: ChannelsSenderPage) => any): Promise<ChannelsSenderPage>;
    /**
     * Provide a user-friendly representation
     */
    toJSON(): any;
    [inspect.custom](_depth: any, options: InspectOptions): any;
}
export declare function ChannelsSenderListInstance(version: V2): ChannelsSenderListInstance;
export declare class ChannelsSenderPage extends Page<V2, ChannelsSenderPayload, ChannelsSenderResource, ChannelsSenderInstance> {
    /**
     * Initialize the ChannelsSenderPage
     *
     * @param version - Version of the resource
     * @param response - Response from the API
     * @param solution - Path solution
     */
    constructor(version: V2, response: Response<string>, solution: ChannelsSenderSolution);
    /**
     * Build an instance of ChannelsSenderInstance
     *
     * @param payload - Payload response from the API
     */
    getInstance(payload: ChannelsSenderResource): ChannelsSenderInstance;
    [inspect.custom](depth: any, options: InspectOptions): string;
}
export {};
