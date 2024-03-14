import { ComponentConfig } from "@measured/puck"
import { Prose as ProseUI } from "@oberon/ui/src/components/prose"

export const Prose: ComponentConfig<{ className?: string }> = {
  fields: {
    className: {
      type: "text",
    },
  },
  render: ({ className, puck: { renderDropZone: DropZone } }) => {
    return (
      <ProseUI className={className}>
        <DropZone zone="prose" />
      </ProseUI>
    )
  },
}
