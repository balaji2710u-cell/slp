import nodemailer from "nodemailer";
import { env } from "../config/env.js";

let transporter = null;

/**
 * Initializes and returns the active Nodemailer transporter.
 * If SMTP configuration is absent or invalid, provides a safe fallback transport.
 */
export function getEmailTransporter() {
  if (transporter) return transporter;

  const hasSmtpConfig = Boolean(env.SMTP_HOST && env.SMTP_USER && env.SMTP_PASS);

  if (hasSmtpConfig) {
    transporter = nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: env.SMTP_PORT || 587,
      secure: env.SMTP_SECURE || false,
      auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASS
      }
    });
  } else {
    // In test or development without SMTP credentials, use JSON transport to safely capture outgoing mail
    transporter = nodemailer.createTransport({
      jsonTransport: true
    });
  }

  return transporter;
}

/**
 * Sends a password reset email to the specified user.
 *
 * @param {Object} options
 * @param {string} options.to - Recipient email address
 * @param {string} options.resetUrl - Full URL to frontend password reset page with token
 * @param {string} options.name - Student or user name
 * @returns {Promise<{ delivered: boolean, messageId?: string }>}
 */
export async function sendPasswordResetEmail({ to, resetUrl, name = "Learner" }) {
  try {
    const activeTransporter = getEmailTransporter();
    const fromAddress = env.EMAIL_FROM || "SmartLearn Support <no-reply@smartlearn.org>";

    const mailOptions = {
      from: fromAddress,
      to,
      subject: "Password Reset Request — SmartLearn Platform",
      text: `Hello ${name},\n\nYou recently requested to reset your password for your SmartLearn account.\n\nPlease click the link below to set a new password:\n${resetUrl}\n\nThis reset link is valid for ${env.RESET_PASSWORD_EXPIRE_MINUTES || 15} minutes and can only be used once.\n\nIf you did not request this password reset, you can safely ignore this email; your account remains secure.\n\nBest regards,\nThe SmartLearn Team`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 580px; margin: 0 auto; padding: 24px; color: #1e293b; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px;">
          <div style="text-align: center; margin-bottom: 24px;">
            <div style="display: inline-block; background-color: #4f46e5; color: #ffffff; padding: 10px 18px; border-radius: 8px; font-weight: 800; font-size: 1.1rem; letter-spacing: -0.5px;">
              SmartLearn
            </div>
          </div>
          <h2 style="color: #0f172a; font-size: 1.35rem; font-weight: 700; margin-bottom: 12px; text-align: center;">Reset Your Password</h2>
          <p style="font-size: 0.95rem; line-height: 1.6; color: #334155; margin-bottom: 16px;">Hello <strong>${name}</strong>,</p>
          <p style="font-size: 0.95rem; line-height: 1.6; color: #334155; margin-bottom: 24px;">
            You requested to reset your password for your SmartLearn account. Click the secure button below to choose a new password:
          </p>
          <div style="text-align: center; margin: 28px 0;">
            <a href="${resetUrl}" style="background-color: #4f46e5; color: #ffffff; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 1rem; display: inline-block; box-shadow: 0 4px 12px rgba(79, 70, 229, 0.25);">
              Reset Password
            </a>
          </div>
          <p style="font-size: 0.85rem; line-height: 1.5; color: #64748b; margin-bottom: 12px;">
            This link is valid for <strong>${env.RESET_PASSWORD_EXPIRE_MINUTES || 15} minutes</strong> and can only be used once. If the button above does not work, copy and paste this link into your browser:
          </p>
          <p style="font-size: 0.82rem; word-break: break-all; color: #4f46e5; margin-bottom: 24px;">
            <a href="${resetUrl}" style="color: #4f46e5;">${resetUrl}</a>
          </p>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
          <p style="font-size: 0.8rem; color: #94a3b8; line-height: 1.5; text-align: center; margin: 0;">
            If you did not request a password reset, you can safely ignore this email. Your password will not change.
          </p>
        </div>
      `
    };

    const info = await activeTransporter.sendMail(mailOptions);
    return { delivered: true, messageId: info.messageId };
  } catch (error) {
    // Fail safely: Never log sensitive tokens or credentials in production
    console.error("Email delivery failed:", error.message);
    return { delivered: false, error: error.message };
  }
}

export default {
  getEmailTransporter,
  sendPasswordResetEmail
};
