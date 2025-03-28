import Items from '@/components/items'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/sub/$subId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Items />
}
