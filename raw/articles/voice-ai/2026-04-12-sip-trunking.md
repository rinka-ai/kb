---
id: article-2026-04-12-sip-trunking
type: source
title: "SIP trunking"
path: raw/articles/voice-ai/2026-04-12-sip-trunking.md
author: ElevenLabs
publisher: ElevenLabs Docs
url: https://elevenlabs.io/docs/eleven-agents/phone-numbers/sip-trunking
date_published: 
date_added: 2026-04-12
tags: [voice-ai, elevenlabs, voice-agents, telephony, sip]
status: processed
quality: high
summary: ElevenLabs' SIP trunking docs explain how to connect existing PBX and telephony systems to voice agents, with practical guidance on signaling, encryption, authentication, headers, and troubleshooting.
related: [voice-ai, elevenlabs, voice-agents, telephony, sip]
---

# SIP trunking

## Source Metadata

- Path: raw/articles/voice-ai/2026-04-12-sip-trunking.md
- Author: ElevenLabs
- Published: Unknown
- Publisher: ElevenLabs Docs
- URL: https://elevenlabs.io/docs/eleven-agents/phone-numbers/sip-trunking

## TL;DR

SIP trunking is the telephony boundary for enterprise voice agents: it connects existing phone systems to ElevenLabs while preserving routing, authentication, personalization metadata, and transport security choices.

## Key Claims

- Enterprise voice deployments often need to preserve existing telephony infrastructure rather than rebuild around app-native calling.
- SIP integrations require explicit choices about signaling, media encryption, and authentication, not just a phone-number mapping.
- Personalization and traceability in telephony depend on metadata headers being forwarded into the voice-agent runtime.
- Operational reliability depends on understanding provider-specific failure modes, codec constraints, and network architecture.

## Important Details

- The docs describe both inbound routing into ElevenLabs and outbound calling back through the customer's SIP infrastructure.
- TLS for signaling and encrypted media are supported, and the docs explicitly recommend TLS plus required media encryption for maximum security.
- Authentication can use digest credentials or ACL/IP allowlisting, with digest preferred.
- ElevenLabs expects G711 or G722 codec support and documents URI construction requirements for calling into the trunk.
- Custom headers such as `X-CALL-ID` and `X-CALLER-ID` are used for personalization and traceability, with Twilio-specific fallback support.
- Troubleshooting guidance covers TLS, SRTP, NAT, one-way audio, and BYE/481 issues caused by reconnecting through the wrong SIP server.

## Entities

- Organization: ElevenLabs
- Concepts: SIP trunking, PBX integration, TLS signaling, SRTP/media encryption, digest authentication
- Headers: `X-CALL-ID`, `X-CALLER-ID`, `sip.twilio.callSid`

## My Notes

- This is the clearest source in the current KB for the enterprise telephony layer of voice-agent architecture.
- It is especially relevant if we want to support legacy phone systems without sacrificing personalization or security boundaries.

## Open Questions

- Do we want to own telephony metadata mapping ourselves, or standardize around provider-specific headers and pre-call hooks?
- Which customers will require digest auth, regional residency, or static-IP infrastructure early?

## Related

- [[voice-ai]]

## Source Text

Overview
SIP (Session Initiation Protocol) trunking allows you to connect your existing telephony infrastructure directly to ElevenLabs Agents.
This integration enables all customers to use their existing phone systems while leveraging ElevenLabs’ advanced voice AI capabilities.
With SIP trunking, you can:

Connect your Private Branch Exchange (PBX) or SIP-enabled phone system to ElevenLabs’ voice AI platform
Route calls to AI agents without changing your existing phone infrastructure
Handle both inbound and outbound calls
Leverage encrypted TLS transport and media encryption for enhanced security

Static IP SIP ServersElevenLabs offers SIP servers with static IP addresses for enterprise clients who require IP allowlisting for their security policies.Our static IP infrastructure uses a /24 IP address block containing 256 addresses distributed across multiple regions (US, EU, and India). You must allowlist the entire /24 block in your firewall configuration.For the default (US/International) environment, use sip-static.rtc.elevenlabs.io as your SIP endpoint. For isolated regions, use sip-static.rtc.in.residency.elevenlabs.io or sip-static.rtc.eu.residency.elevenlabs.io as needed. When using these endpoints, all traffic will originate exclusively from within that region. Specific whitelisting per-region is not available.This feature is available for Enterprise accounts and can also be enabled during Enterprise trials for testing purposes. To request access, open a support ticket or contact your account representative. For more information, contact sales.
How SIP trunking works
SIP trunking establishes a direct connection between your telephony infrastructure and the ElevenLabs platform:

Inbound calls: Calls from your SIP trunk are routed to the ElevenLabs platform using your configured SIP INVITE address.
Outbound calls: Calls initiated by ElevenLabs are routed to your SIP trunk using your configured hostname, enabling your agents to make outgoing calls.
Authentication: Connection security for the signaling is maintained through either digest authentication (username/password) or Access Control List (ACL) authentication based on the signaling source IP.
Signaling and Media: The initial call setup (signaling) supports multiple transport protocols including TLS for encrypted communication. Once the call is established, the actual audio data (RTP stream) can be encrypted based on your media encryption settings.

Making calls to ElevenLabs SIP trunk
When initiating calls to the ElevenLabs platform, you need to use the proper SIP URI format.
The ElevenLabs SIP trunk URI is:

To make a call, construct a complete SIP URI that includes an identifier:

+19991234567 is the identifier (typically a phone number in E.164 format)
The identifier can also be any string value, such as 1000 or john

Common Mistake: Do not initiate calls directly to sip@sip.rtc.elevenlabs.io:5060 without an
identifier. The SIP URI must include a phone number or identifier after the sip: prefix and
before the @ symbol.
SIP URI Format: A SIP URI follows the format
sip:identifier@domain:port where the identifier is required to route the call properly.
Requirements
Before setting up SIP trunking, ensure you have:

A SIP-compatible PBX or telephony system
Phone numbers that you want to connect to ElevenLabs
Administrator access to your SIP trunk configuration
Appropriate firewall settings to allow SIP traffic
TLS Support: For enhanced security, ensure your SIP trunk provider supports TLS transport
Audio codec compatibility:
Your system must support either G711 or G722 audio codecs or be capable of resampling audio on your end. ElevenLabs’ SIP deployment outputs and receives audio at this sample rate. This is independent of any audio format configured on the agent for direct websocket connections.

Setting up SIP trunking
2Import SIP TrunkClick on “Import a phone number from SIP trunk” button to open the configuration dialog.3Enter basic configurationComplete the basic configuration with the following information:
Label: A descriptive name for the phone number
Phone Number: The E.164 formatted phone number to connect (e.g., +15551234567)
4Configure transport and encryptionConfigure the transport protocol and media encryption settings for enhanced security:
Transport Type: Select the transport protocol for SIP signaling:

TCP: Standard TCP transport
TLS: Encrypted TLS transport for enhanced security

Media Encryption: Configure encryption for RTP media streams:

Disabled: No media encryption
Allowed: Permits encrypted media streams
Required: Enforces encrypted media streams

Security Best Practice: Use TLS transport with Required media encryption for maximum security. This ensures both signaling and media are encrypted end-to-end.5Configure outbound settingsConfigure where ElevenLabs should send calls for your phone number:
Address: Hostname or IP address where the SIP INVITE is sent (e.g., sip.telnyx.com). This should be a hostname or IP address only, not a full SIP URI.
Transport Type: Select the transport protocol for SIP signaling:

TCP: Standard TCP transport
TLS: Encrypted TLS transport for enhanced security

Media Encryption: Configure encryption for RTP media streams:

Disabled: No media encryption
Allowed: Permits encrypted media streams
Required: Enforces encrypted media streams

Security Best Practice: Use TLS transport with Required media encryption for maximum security. This ensures both signaling and media are encrypted end-to-end.The Address field specifies where ElevenLabs will send outbound calls from your AI agents. Enter only the hostname or IP address without the sip: protocol prefix.7Configure authentication (optional)Provide digest authentication credentials if required by your SIP trunk provider:
SIP Trunk Username: Username for SIP digest authentication
SIP Trunk Password: Password for SIP digest authentication
If left empty, Access Control List (ACL) authentication will be used, which requires you to allowlist ElevenLabs IP addresses in your provider’s settings.Authentication Methods:
Digest Authentication: Uses username/password credentials for secure authentication (recommended)
ACL Authentication: Uses IP address allowlisting for access control
Digest Authentication is strongly recommended as it provides better security without relying on IP allowlisting, which can be complex to manage with dynamic IP addresses.8Complete SetupClick “Import” to finalize the configuration.
Client Data and Personalization
To ensure proper forwarding and traceability of call metadata, include the following custom SIP headers in your webhook payload and SIP INVITE request:

X-CALL-ID: Unique identifier for the call
X-CALLER-ID: Identifier for the calling party

These headers enable the system to associate call metadata with the conversation and provide context for personalization.

If the standard headers above are not present, the system will automatically look for the Twilio-specific SIP header:

sip.twilio.callSid: Twilio’s unique call identifier

This fallback ensures compatibility with Twilio’s Elastic SIP Trunking without requiring configuration changes.
Processing Flow
Once the relevant metadata is received through any of the supported headers, the caller_id and/or call_id are available in the pre-call webhook and as system dynamic variables.
Assigning Agents to Phone Numbers
After importing your SIP trunk phone number, you can assign it to a ElevenLabs agent:

Go to the Phone Numbers section in the ElevenAgents dashboard
Select your imported SIP trunk phone number
Click “Assign Agent”
Select the agent you want to handle calls to this number

Troubleshooting
Connection IssuesIf you’re experiencing connection problems:
Verify your SIP trunk configuration on both the ElevenLabs side and your provider side
Check that your firewall allows SIP signaling traffic on the configured transport protocol and port (5060 for TCP, 5061 for TLS) and ensure there is no whitelisting applied
Confirm that your address hostname is correctly formatted and accessible
Test with and without digest authentication credentials
If using TLS transport, ensure your provider’s TLS certificates are valid and properly configured
Try different transport types (TCP only, as UDP is not currently available) to isolate TLS-specific issues
Important Network Architecture Information:
ElevenLabs runs multiple SIP servers behind the load balancer sip.rtc.elevenlabs.io
The SIP servers communicate directly with your SIP server, bypassing the load balancer
SIP requests may come from different IP addresses due to our distributed infrastructure
If your security policy requires whitelisting inbound traffic, please contact our support team for assistance.
Authentication FailuresIf calls are failing due to authentication issues:
Double-check your SIP trunk username and password if using digest authentication
Check your SIP trunk provider’s logs for specific authentication error messages
Verify that custom headers, if configured, match your provider’s requirements
Test with simplified configurations (no custom headers) to isolate authentication issues
TLS and Encryption IssuesIf you’re experiencing issues with TLS transport or media encryption:
Verify that your SIP trunk provider supports TLS transport on port 5061
Check certificate validity, expiration dates, and trust chains
Ensure your provider supports SRTP media encryption if using “Required” media encryption
Test with “Allowed” media encryption before using “Required” to isolate encryption issues
Try TCP transport to isolate TLS-specific problems (UDP is not currently available)
Contact your SIP trunk provider to confirm TLS and SRTP support
No Audio or One-Way AudioIf the call connects but there’s no audio or audio only flows one way:
Verify that your firewall allows UDP traffic for the RTP media stream (typically ports 10000-60000)
Since RTP uses dynamic IP addresses, ensure firewall rules are not restricted to specific static IPs
Check for Network Address Translation (NAT) issues that might be blocking the RTP stream
If using “Required” media encryption, ensure both endpoints support SRTP
Test with “Disabled” media encryption to isolate encryption-related audio issues
Audio Quality IssuesIf you experience poor audio quality:
Ensure your network has sufficient bandwidth (at least 100 Kbps per call) and low latency/jitter for UDP traffic
Check for network congestion or packet loss, particularly on the UDP path
Verify codec settings match on both ends
If using media encryption, ensure both endpoints efficiently handle SRTP processing
Test with different media encryption settings to isolate quality issues
Call not disconnecting after sending the BYE request (receiving a 481 response)A 481 response on a BYE usually means the request reached a SIP server that does not have the dialog state for the call.
This often happens when the initial TCP connection has already closed and the BYE is re-sent to the generic load balancer address (for example sip.rtc.elevenlabs.io)
rather than the specific Contact URI returned in the 200 OK response.
When re-establishing a TCP connection for BYE, always target the Contact address from the INVITE response so the request reaches the same SIP server that handled the dialog.
Avoid sending BYE to the load balancer URI because the request can land on a different SIP node, which rejects it with 481.

Support for multiple concurrent calls depends on your subscription tier
Call recording and analytics features are available but may require additional configuration
Outbound calling capabilities may be limited by your SIP trunk provider
TLS Support: Ensure your SIP trunk provider supports TLS 1.2 or higher for encrypted transport
Media Encryption: SRTP support varies by provider; verify compatibility before requiring encryption
Audio format: ElevenLabs’ SIP deployment outputs and receives audio in G711 8kHz or G722 16kHz audio codecs. This is independent of any audio format configured on the agent for direct websocket connections. Your SIP trunk system must either support this format natively or perform resampling to match your system’s requirements

FAQ
Can I use my existing phone numbers with ElevenLabs?Yes, SIP trunking allows you to connect your existing phone numbers directly to ElevenLabs’
ElevenAgents without porting them.What SIP trunk providers are compatible with ElevenLabs?ElevenLabs is compatible with most standard SIP trunk providers including Twilio, Vonage,
RingCentral, Sinch, Infobip, Telnyx, Exotel, Plivo, Bandwidth, and others that support SIP
protocol standards. TLS transport and SRTP media encryption are supported for enhanced security.Should I use TLS transport for better security?Yes, TLS transport is highly recommended for production environments. It provides encrypted SIP
signaling which enhances security for your calls. Combined with required media encryption, it
ensures comprehensive protection of your communications. Always verify your SIP trunk provider
supports TLS before enabling it.What's the difference between transport types?
TCP: Reliable but unencrypted signaling - TLS: Encrypted and reliable signaling
(recommended for production)
UDP transport is not currently available. For security-critical applications, always use TLS
transport.How many concurrent calls are supported?The number of concurrent calls depends on your subscription plan. Enterprise plans typically allow
for higher volumes of concurrent calls.Can I route calls conditionally to different agents?Yes, you can use your existing PBX system’s routing rules to direct calls to different phone
numbers, each connected to different ElevenLabs agents.Do I need to match the leading + format when importing phone numbers?Yes, the phone number format must be consistent between your SIP URI and your imported phone
number configuration. If you call the SIP URI with a leading + (e.g.,
sip:+19991234567@sip.rtc.elevenlabs.io:5060), you must also import the phone number with the
leading + (e.g., +19991234567). Similarly, if you call without the leading +, import the phone
number without it. Mismatched formats will prevent proper call routing.Do you support SRV record lookups for SIP?Yes, ElevenLabs provides NAPTR and SRV records for RFC 3263 compliant SIP server discovery.
Next steps
