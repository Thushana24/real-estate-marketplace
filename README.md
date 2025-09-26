# Real Estate Marketplace

A full-stack real estate marketplace built with **Next.js 15, Prisma, TailwindCSS, React Query, Zustand, and Zod**.  
This platform allows users to register, log in, and securely post, view, and manage property ads.

---


## Features

- User Authentication (JWT-based)  
- Post and View Property Ads  
- Role-based Access (Only logged-in users can post ads)  
- Responsive UI with TailwindCSS  

## Getting Started

Clone the repository:

```bash
git clone [https://github.com/Thushana24//real-estate-app.git]
cd real-estate-app

npm install
# or
yarn install

DATABASE_URL="mysql://USER:PASSWORD@localhost:3306/DATABASE_NAME"
JWT_SECRET="your-secret-key"
NEXT_PUBLIC_API_BASE_URL=<BASE_URL>
NEXT_PUBLIC_HOST_URL=<NEXT_PUBLIC_HOST_URL>

npx prisma generate
npx prisma migrate dev --name init
npx prisma db seed  

npm run dev
