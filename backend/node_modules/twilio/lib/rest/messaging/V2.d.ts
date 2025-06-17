import MessagingBase from "../MessagingBase";
import Version from "../../base/Version";
import { ChannelsSenderListInstance } from "./v2/channelsSender";
export default class V2 extends Version {
    /**
     * Initialize the V2 version of Messaging
     *
     * @param domain - The Twilio (Twilio.Messaging) domain
     */
    constructor(domain: MessagingBase);
    /** channelsSenders - { Twilio.Messaging.V2.ChannelsSenderListInstance } resource */
    protected _channelsSenders?: ChannelsSenderListInstance;
    /** Getter for channelsSenders resource */
    get channelsSenders(): ChannelsSenderListInstance;
}
