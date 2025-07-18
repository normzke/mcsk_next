# MCSK Next.js Website

A modern, responsive website for the Music Copyright Society of Kenya (MCSK) built with Next.js 14, TypeScript, and Tailwind CSS.

## 🚀 Features

### Public Features
- **Homepage**: Dynamic landing page with featured content and announcements
- **About Us**: Information about MCSK's mission, vision, and history
- **Services**: Detailed information about MCSK's services
- **Membership**: Information about membership benefits and application process
- **Licensing**: Details about music licensing services
- **MCSK Wave**: Digital platform for music distribution and royalties
- **News & Events**: Latest updates and upcoming events
- **Contact**: Contact information and inquiry form

### Admin Features
- **Dashboard**: Overview of key metrics and recent activities
- **Content Management**:
  - News management
  - Events management
  - Announcements management
  - Wave management
  - Downloads management
- **User Management**: Admin user management system
- **Authentication**: Secure login system with role-based access control

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: NextAuth.js
- **UI Components**: 
  - Shadcn UI
  - Framer Motion (animations)
  - React Icons
- **Form Handling**: React Hook Form with Zod validation
- **State Management**: React Context + Zustand
- **API**: RESTful API with Next.js API routes

## 📦 Database Schema

### Main Tables
- `users` - User accounts and authentication
- `news` - News articles and updates
- `events` - Upcoming and past events
- `announcements` - Important announcements
- `waves` - MCSK Wave platform content
- `downloads` - Downloadable resources
- `contacts` - Contact form submissions

## 🔐 Credentials

### Development Environment
- **Admin Login**:
  - Email: admin@mcsk.org
  - Password: admin123
- **Database**:
  - Host: localhost
  - Port: 5432
  - Database: mcsk_db
  - User: postgres
  - Password: postgres

### Production Environment
- **Admin Login**: Use the credentials provided by the system administrator
- **Database**: Use the production database credentials provided by the system administrator

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/mcsk-next.git
   cd mcsk-next
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory with the following variables:
   ```env
   # Database
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/mcsk_db"

   # NextAuth
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3000"

   # Email (for contact form)
   SMTP_HOST="smtp.example.com"
   SMTP_PORT="587"
   SMTP_USER="your-email@example.com"
   SMTP_PASSWORD="your-password"
   ```

4. **Set up the database**
   ```bash
   npx prisma migrate dev
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Build for production**
   ```bash
   npm run build
   ```

## 📁 Project Structure

```
mcsk-next/
├── app/                    # Next.js app directory
│   ├── admin/             # Admin dashboard pages
│   ├── api/               # API routes
│   └── (routes)/          # Public pages
├── components/            # React components
│   ├── admin/            # Admin-specific components
│   ├── ui/               # Reusable UI components
│   └── shared/           # Shared components
├── lib/                  # Utility functions and configurations
├── prisma/               # Database schema and migrations
├── public/              # Static assets
└── styles/              # Global styles
```

## 🔒 Security Features

- Role-based access control (RBAC)
- Secure password hashing
- CSRF protection
- Rate limiting on API routes
- Input validation and sanitization
- Secure session management

## 📱 Responsive Design

The website is fully responsive and optimized for:
- Desktop (1920px, 1440px, 1024px)
- Tablet (768px)
- Mobile (480px, 320px)

## 🎨 Design System

- **Colors**:
  - Primary: #1a1464 (Deep Blue)
  - Secondary: #4CAF50 (Green)
  - Accent: #FFC107 (Yellow)
  - Text: #333333
  - Background: #FFFFFF

- **Typography**:
  - Headings: Inter
  - Body: Roboto
  - Monospace: JetBrains Mono

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- Project Manager: [Name]
- Lead Developer: [Name]
- UI/UX Designer: [Name]
- Backend Developer: [Name]
- Frontend Developer: [Name]

## 📞 Support

For support, email support@mcsk.org or create an issue in the repository.
