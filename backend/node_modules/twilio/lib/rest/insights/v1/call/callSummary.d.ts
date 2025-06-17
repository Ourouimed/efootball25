/// <reference types="node" />
import { inspect, InspectOptions } from "util";
import V1 from "../../V1";
export type CallSummaryAnsweredBy = "unknown" | "machine_start" | "machine_end_beep" | "machine_end_silence" | "machine_end_other" | "human" | "fax";
export type CallSummaryCallState = "ringing" | "completed" | "busy" | "fail" | "noanswer" | "canceled" | "answered" | "undialed";
export type CallSummaryCallType = "carrier" | "sip" | "trunking" | "client" | "whatsapp";
export type CallSummaryProcessingState = "complete" | "partial";
/**
 * Options to pass to fetch a CallSummaryInstance
 */
export interface CallSummaryContextFetchOptions {
    /** The Processing State of this Call Summary. One of `complete`, `partial` or `all`. */
    processingState?: CallSummaryProcessingState;
}
export interface CallSummaryContext {
    /**
     * Fetch a CallSummaryInstance
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed CallSummaryInstance
     */
    fetch(callback?: (error: Error | null, item?: CallSummaryInstance) => any): Promise<CallSummaryInstance>;
    /**
     * Fetch a CallSummaryInstance
     *
     * @param params - Parameter for request
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed CallSummaryInstance
     */
    fetch(params: CallSummaryContextFetchOptions, callback?: (error: Error | null, item?: CallSummaryInstance) => any): Promise<CallSummaryInstance>;
    /**
     * Provide a user-friendly representation
     */
    toJSON(): any;
    [inspect.custom](_depth: any, options: InspectOptions): any;
}
export interface CallSummaryContextSolution {
    callSid: string;
}
export declare class CallSummaryContextImpl implements CallSummaryContext {
    protected _version: V1;
    protected _solution: CallSummaryContextSolution;
    protected _uri: string;
    constructor(_version: V1, callSid: string);
    fetch(params?: CallSummaryContextFetchOptions | ((error: Error | null, item?: CallSummaryInstance) => any), callback?: (error: Error | null, item?: CallSummaryInstance) => any): Promise<CallSummaryInstance>;
    /**
     * Provide a user-friendly representation
     *
     * @returns Object
     */
    toJSON(): CallSummaryContextSolution;
    [inspect.custom](_depth: any, options: InspectOptions): string;
}
interface CallSummaryResource {
    account_sid: string;
    call_sid: string;
    call_type: CallSummaryCallType;
    call_state: CallSummaryCallState;
    answered_by: CallSummaryAnsweredBy;
    processing_state: CallSummaryProcessingState;
    created_time: Date;
    start_time: Date;
    end_time: Date;
    duration: number;
    connect_duration: number;
    from: Record<string, object>;
    to: Record<string, object>;
    carrier_edge: Record<string, object>;
    client_edge: Record<string, object>;
    sdk_edge: Record<string, object>;
    sip_edge: Record<string, object>;
    tags: Array<string>;
    url: string;
    attributes: Record<string, object>;
    properties: Record<string, object>;
    trust: Record<string, object>;
    annotation: Record<string, object>;
}
export declare class CallSummaryInstance {
    protected _version: V1;
    protected _solution: CallSummaryContextSolution;
    protected _context?: CallSummaryContext;
    constructor(_version: V1, payload: CallSummaryResource, callSid: string);
    /**
     * The unique SID identifier of the Account.
     */
    accountSid: string;
    /**
     * The unique SID identifier of the Call.
     */
    callSid: string;
    callType: CallSummaryCallType;
    callState: CallSummaryCallState;
    answeredBy: CallSummaryAnsweredBy;
    processingState: CallSummaryProcessingState;
    /**
     * The time at which the Call was created, given in ISO 8601 format. Can be different from `start_time` in the event of queueing due to CPS
     */
    createdTime: Date;
    /**
     * The time at which the Call was started, given in ISO 8601 format.
     */
    startTime: Date;
    /**
     * The time at which the Call was ended, given in ISO 8601 format.
     */
    endTime: Date;
    /**
     * Duration between when the call was initiated and the call was ended
     */
    duration: number;
    /**
     * Duration between when the call was answered and when it ended
     */
    connectDuration: number;
    /**
     * The calling party.
     */
    from: Record<string, object>;
    /**
     * The called party.
     */
    to: Record<string, object>;
    /**
     * Contains metrics and properties for the Twilio media gateway of a PSTN call.
     */
    carrierEdge: Record<string, object>;
    /**
     * Contains metrics and properties for the Twilio media gateway of a Client call.
     */
    clientEdge: Record<string, object>;
    /**
     * Contains metrics and properties for the SDK sensor library for Client calls.
     */
    sdkEdge: Record<string, object>;
    /**
     * Contains metrics and properties for the Twilio media gateway of a SIP Interface or Trunking call.
     */
    sipEdge: Record<string, object>;
    /**
     * Tags applied to calls by Voice Insights analysis indicating a condition that could result in subjective degradation of the call quality.
     */
    tags: Array<string>;
    /**
     * The URL of this resource.
     */
    url: string;
    /**
     * Attributes capturing call-flow-specific details.
     */
    attributes: Record<string, object>;
    /**
     * Contains edge-agnostic call-level details.
     */
    properties: Record<string, object>;
    /**
     * Contains trusted communications details including Branded Call and verified caller ID.
     */
    trust: Record<string, object>;
    /**
     * Programmatically labeled annotations for the Call. Developers can update the Call Summary records with Annotation during or after a Call. Annotations can be updated as long as the Call Summary record is addressable via the API.
     */
    annotation: Record<string, object>;
    private get _proxy();
    /**
     * Fetch a CallSummaryInstance
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed CallSummaryInstance
     */
    fetch(callback?: (error: Error | null, item?: CallSummaryInstance) => any): Promise<CallSummaryInstance>;
    /**
     * Fetch a CallSummaryInstance
     *
     * @param params - Parameter for request
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed CallSummaryInstance
     */
    fetch(params: CallSummaryContextFetchOptions, callback?: (error: Error | null, item?: CallSummaryInstance) => any): Promise<CallSummaryInstance>;
    /**
     * Provide a user-friendly representation
     *
     * @returns Object
     */
    toJSON(): {
        accountSid: string;
        callSid: string;
        callType: CallSummaryCallType;
        callState: CallSummaryCallState;
        answeredBy: CallSummaryAnsweredBy;
        processingState: CallSummaryProcessingState;
        createdTime: Date;
        startTime: Date;
        endTime: Date;
        duration: number;
        connectDuration: number;
        from: Record<string, object>;
        to: Record<string, object>;
        carrierEdge: Record<string, object>;
        clientEdge: Record<string, object>;
        sdkEdge: Record<string, object>;
        sipEdge: Record<string, object>;
        tags: string[];
        url: string;
        attributes: Record<string, object>;
        properties: Record<string, object>;
        trust: Record<string, object>;
        annotation: Record<string, object>;
    };
    [inspect.custom](_depth: any, options: InspectOptions): string;
}
export interface CallSummarySolution {
    callSid: string;
}
export interface CallSummaryListInstance {
    _version: V1;
    _solution: CallSummarySolution;
    _uri: string;
    (): CallSummaryContext;
    get(): CallSummaryContext;
    /**
     * Provide a user-friendly representation
     */
    toJSON(): any;
    [inspect.custom](_depth: any, options: InspectOptions): any;
}
export declare function CallSummaryListInstance(version: V1, callSid: string): CallSummaryListInstance;
export {};
