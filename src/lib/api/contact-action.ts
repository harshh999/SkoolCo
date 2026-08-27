import { createServerFn } from "@tanstack/react-start";
import { contactSchema } from "../validation/contact";

export const submitContactForm = createServerFn({ method: "POST" })
  .validator((data: unknown) => {
    const result = contactSchema.safeParse(data);
    if (!result.success) {
      throw new Error(JSON.stringify(result.error.flatten()));
    }
    return result.data;
  })
  .handler(async ({ data }) => {
    const { name, email, company, phone, projectType, message } = data;

    const apiKey = process.env["RESEND_API_KEY"];
    const receiverEmail = process.env["CONTACT_RECEIVER_EMAIL"] || "hello@skool.company";

    // Re-verify on server-side
    console.info(`[Server Function - Contact Form Log]
Name: ${name}
Email: ${email}
Company: ${company}
Phone: ${phone || "N/A"}
Project Type: ${projectType || "N/A"}
Message: ${message}
    `);

    if (apiKey) {
      try {
        const response = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            from: "Skool Website Form <onboarding@resend.dev>",
            to: receiverEmail,
            subject: `New Inquiry from ${name} — Skool Company`,
            reply_to: email,
            html: `
              <h2>New Website Inquiry</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Company / Brand:</strong> ${company}</p>
              <p><strong>Phone Number:</strong> ${phone || "Not provided"}</p>
              <p><strong>Services Needed:</strong> ${projectType || "Not specified"}</p>
              <p><strong>Project Details:</strong></p>
              <p style="white-space: pre-line;">${message}</p>
            `,
          }),
        });

        if (!response.ok) {
          const errorDetails = await response.json();
          console.error("Resend delivery failed:", errorDetails);
          return { success: false, error: "Failed to dispatch notification email." };
        }
      } catch (err) {
        console.error("Resend API request exception:", err);
        return { success: false, error: "Server failed to deliver email notification." };
      }
    }

    return { success: true };
  });
