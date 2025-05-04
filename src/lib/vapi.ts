import Vapi from "@vapi-ai/web";

export const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY!);
console.log("VAPI Key:", process.env.NEXT_PUBLIC_VAPI_API_KEY);

