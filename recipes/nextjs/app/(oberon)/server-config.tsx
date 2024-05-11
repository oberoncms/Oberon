import "server-only"

import { oberonAdapter } from "@oberoncms/adapter-turso"
import { initAdapter } from "@oberoncms/core/adapter"
import { initAuth } from "@oberoncms/core/auth"
import { Resend } from "resend"
import { uploadthingPlugin } from "@oberoncms/upload-thing/plugin"
import type { OberonUser } from "@oberoncms/core"

const emailFrom = process.env.EMAIL_FROM || "noreply@tohuhono.com"

const sendVerificationRequest = async ({
  email,
  token,
  url,
}: {
  email: string
  token: string
  url: string
}) => {
  if (!process.env.RESEND_SECRET) {
    throw new Error("No RESEND_SECRET configured")
  }
  const resend = new Resend(process.env.RESEND_SECRET)

  try {
    const response = await resend.emails.send({
      from: emailFrom,
      to: email,
      subject: "One time login to Oberon CMS",
      text: `Sign in with code\n\n${token}\n\n ${url} \n\n`,
    })

    if (response.error || !response.data?.id) {
      console.error("Resend response error", response.error)
      return
    }

    console.log(`Sent email id ${response.data.id}`)
  } catch (error) {
    console.error("Signin email failed to send")
  }
}

export const { handlers, auth } = initAuth({
  databaseAdapter: oberonAdapter,
  sendVerificationRequest,
})

export const adapter = initAdapter({
  databaseAdapter: oberonAdapter,
  getUser: async () => {
    const session = await auth()

    return (session?.user as OberonUser) || null
  },
  plugins: [uploadthingPlugin],
})
