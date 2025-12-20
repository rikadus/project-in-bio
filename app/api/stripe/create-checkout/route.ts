// app/api/stripe/create-checkout/route.ts

import { auth } from "@/app/lib/auth";
import { db } from "@/app/lib/firebase";
import stripe from "@/app/lib/stripe";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    // 1. Extrai o corpo da requisição (metadata e se é assinatura)
    const { metadata, isSubscription } = await req.json();

    // 2. Define o preço com base no tipo (assinatura ou único)
    const price = isSubscription 
    ? process.env.STRIPE_SUBSCRIPTION_PRICE_ID 
    : process.env.STRIPE_PRICE_ID;

    // 3. Obtém a sessão do usuário (autenticação)
    const userSession = await auth();

    // 4. Valida se usuário está logado
    if (!userSession || !userSession.user?.id || !userSession.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = userSession.user.id;
    const userEmail = userSession.user.email;
    const userName = userSession.user?.name;

    // 5. Busca referência do usuário no Firestore
    const userRef = db.collection("users").doc(userId || "");
    const userDoc = await userRef.get(); 
    
    let customerId

    // 6. Verifica se usuário já tem Customer ID do Stripe
    if (userDoc.exists) {
      customerId = userDoc.data()?.customerId;
    }

    // 7. Se não tiver, cria um novo Customer no Stripe
    if(!customerId){
      const newCustomer = await stripe.customers.create({
        email: userEmail,
        name: userName || "Sem nome",
        metadata: {
          userId: userId || "",
          
        }
      });
      customerId = newCustomer.id;
      // Salva o Customer ID no Firestore
      await userRef.set({ customerId }, { merge: true });
    }

    // 8. Cria a sessão de Checkout do Stripe
    const session = await stripe.checkout.sessions.create({
        customer: customerId,
        line_items: [{
          price: price,
          quantity: 1,
        }],
        mode: isSubscription ? "subscription" : "payment",
        payment_method_types: isSubscription ? ["card"] : ["card", "boleto"],       
        success_url: `${req.headers.get("origin")}/${metadata.profileId}?checkout_success=true`,
        cancel_url: `${req.headers.get("origin")}/${metadata.profileId}/upgrade`,
        client_reference_id: userId,
        metadata,
    })

    // 9. Retorna o ID da sessão
    return NextResponse.json({ 
      sessionId: session.id 
    });
}