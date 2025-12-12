// app/components/landing-page/commons/portal-button.tsx
"use client"

import { useStripe } from "@/app/hooks/useStripe"

/**
 * Botão que redireciona para o Portal do Cliente Stripe.
 * Utiliza o hook personalizado `useStripe`.
 */
export default function PortalButton() {

  const {handleCreateStripePortal} = useStripe()

    return <button onClick={handleCreateStripePortal}>Portal</button>

}