# Project In Bio 🚀

**Project In Bio** is a modern **Micro-SaaS** application that allows developers and creators to build a personalized "Link in Bio" page. Users can showcase their social media links, highlight featured projects, and track visitor analytics in a beautifully designed, high-performance interface.

![Project Preview](/public/project-preview.png)

## ✨ Key Features

- **🎨 Personalized Portfolio**: Create a stunning public profile with your photo, description, and social links.
- **📂 Project Showcase**: Highlight your best work with dedicated project cards, including images and descriptions.
- **🔗 Social Hub**: Centralize all your social media presence (GitHub, LinkedIn, Instagram, Twitter) in one place.
- **📊 Analytics**: Real-time tracking of total profile visits and individual project clicks.
- **💳 Subscription System**: Integrated with **Stripe** for premium features (Monthy/Lifetime plans).
- **🔒 Secure Authentication**: Powered by social login (Google) for seamless access.
- **⚡ High Performance**: Built with Next.js App Router for optimal SEO and loading speeds.

## 🛠️ Tech Stack

This project was built using the latest modern web development technologies:

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router & Server Actions)
- **Language**: [TypeScript](https://www.typescriptlang.org/) for robust type safety.
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) for a reliable and responsive design system.
- **Backend / Database**: [Firebase](https://firebase.google.com/) (Firestore & Storage) for serverless data management.
- **Authentication**: [Auth.js](https://authjs.dev/) (NextAuth) for secure session management.
- **Payments**: [Stripe](https://stripe.com/) for managing subscriptions and products.
- **Icons**: [Lucide React](https://lucide.dev/) for clean, consistent iconography.

## 🚀 Getting Started

Follow these steps to run the project locally:

### Prerequisites

- Node.js 18+ installed
- A Firebase project configured
- Stripe account (for payment features)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/projectinbio.git
   cd projectinbio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env.local` file in the root directory and add your keys:
   ```env
   # Firebase
   NEXT_PUBLIC_FIREBASE_API_KEY=your_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

   # Auth
   AUTH_SECRET=your_secret
   AUTH_GOOGLE_ID=your_google_id
   AUTH_GOOGLE_SECRET=your_google_secret

   # Stripe
   STRIPE_SECRET_KEY=your_stripe_key
   NEXT_PUBLIC_STRIPE_PUBLIC_KEY=your_stripe_public_key
   STRIPE_WEBHOOK_SECRET=your_webhook_secret
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application running.

## 📂 Project Structure

```bash
projectinbio/
├── app/
│   ├── actions/        # Server Actions (Business Logic)
│   ├── components/     # Reusable UI Components
│   │   ├── landing-page/   # Components specific to LP
│   │   └── ui/             # Generic UI (Buttons, Inputs)
│   ├── lib/            # Utilities and Configurations
│   └── server/         # Data Fetching Logic
├── public/             # Static Assets
└── ...
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

<p align="center">
  Built Ricardo Rodrigo
</p>
