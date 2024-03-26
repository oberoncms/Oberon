"use client"
import { OberonClient, type OberonServerProps } from "@oberon/core/editor"

import { config } from "@/app/(oberon)/client-config"

export const Client = (props: OberonServerProps) => (
  <OberonClient config={config} {...props} />
)
