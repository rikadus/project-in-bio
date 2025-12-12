import stripe from "@/app/lib/stripe";
import { NextResponse } from "next/server";
import { auth } from "@/app/lib/auth";
import { db } from "@/app/lib/firebase";


export async function POST(request: Request) {

  const session = await auth();//Usuário autenticado
  const userId = session?.user.id;

  if (!userId) {
    return NextResponse.json({ error: "Usuário não autenticado" }, { status: 401 })
  }

  const user = await db.collection("users").doc(userId).get();
  const customerId = user.data()?.customerId;

  if (!customerId) {
    return NextResponse.json({ error: "Usuário não autenticado" }, { status: 401 })
  }

  try {

    const portalSession = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${request.headers.get('origin')}/`,
    });
    return NextResponse.json({ url: portalSession.url })
  
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Erro ao criar portal" }, { status: 500 })
  }
 
        
}