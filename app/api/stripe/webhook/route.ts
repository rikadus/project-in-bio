// app/api/stripe/webhook/route.ts

import { NextRequest, NextResponse } from "next/server";
import stripe from "@/app/lib/stripe";
import { db } from "@/app/lib/firebase";
import Stripe from "stripe";



export async function POST(req: NextRequest) {

  try {
    const body = await req.text();
    
    const signature = req.headers.get("Stripe-Signature");

    const secret = process.env.STRIPE_WEBHOCK_SECRET;

    if (!signature || !secret) {
        throw new Error("Stripe webhook secret is not set");
    }

    const event = stripe.webhooks.constructEvent(body, signature, secret);

    switch (event.type) {
        case "checkout.session.completed":   
        // Usuário completou o pagamento 
        if (event.data.object.payment_status === "paid"){
          const useId = event.data.object.client_reference_id;
          if (useId) {
            await db.collection("users").doc(useId).update({
            isSubscribed: true,
            
          });
          }
          
        }

        // Verificae se foi boleto?

        if (event.data.object.payment_status === "paid" && event.data.object.payment_intent){
          const paymentIntent = await stripe.paymentIntents.retrieve(event.data.object.payment_intent.toString());
          const hostedVoucheUrl = paymentIntent.next_action?.boleto_display_details?.hosted_voucher_url;

          if (hostedVoucheUrl){ 
            const userEmail = event.data.object.customer_details?.email;
           console.log("Enviar email para o cliente com o boleto")
          }
        }
           console.log("Usuário completou o pagamento")    
            break;
        case "checkout.session.async_payment_succeeded":
        console.log("usuário pagou com boleto")
        // Pagamento boleto foi concluído
         if (event.data.object.payment_status === "paid"){
          const useId = event.data.object.client_reference_id;
          if (useId) {
            await db.collection("users").doc(useId).update({
            isSubscribed: true,
            
          });
          }
        }
            break;
        case "customer.subscription.deleted":
          console.log("usuário cancelou a assinatura")
          // Usuário cancelou a assinatura
          const subscription = event.data.object;
          const customerId = subscription.customer as string;

          if (customerId){
              const customer = await stripe.customers.retrieve(customerId) as Stripe.Customer;
              
              if (customer && customer.metadata.userId){
                const userId = customer.metadata.userId;

                await db.collection("users").doc(userId).update({
                  isSubscribed: false,
                });
              }

          }         
            break;      
    }
    
    return new NextResponse(null, { status: 200 });
  } catch (error) {
    console.error("Erro ao processar webhook:", error);
    return new NextResponse(null, { status: 500 });
  }

    
}
