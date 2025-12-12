// app/components/landing-page/commons/portal-button.tsx
"use client"

import { useStripe } from "@/app/hooks/useStripe"

export default function PortalButton() {

  const {handleCreateStripePortal} = useStripe()

    return <button onClick={handleCreateStripePortal}>Portal</button>

}