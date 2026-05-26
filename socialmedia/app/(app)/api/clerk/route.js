import { Webhook } from "svix";
import { headers } from "next/headers";
import { createUser } from "@/actions/User";

export async function POST(request) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk dashboard to .env.local"
    );
  }

  const headerPayload = await headers();

  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Missing headers", { status: 400 });
  }

  const payload = await request.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(WEBHOOK_SECRET);

  let evt;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Invalid signature", { status: 400 });
  }

  const eventType = evt.type;

  console.log(`Received ${eventType} event`);

  const {id, first_name, last_name, email_addresses, image_url, username} = evt.data;

  const email_address = email_addresses[0].email_address;

  if (eventType === "user.created") {
    try {
        await createUser({
            id,
            first_name,last_name,
            email: email_address,
            image_url,
            username
        })
    } catch (err) {
      console.error("Error processing user.created event:", err);
    }  
}

  return Response.json({
    success: true,
    event: eventType,
  });
}

export async function GET() {
  return Response.json({
    message: "Hello, World!",
  });
}