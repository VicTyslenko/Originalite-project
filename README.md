# Originalite — Full-Stack E-Commerce Platform

A full-stack fashion e-commerce application with a React/TypeScript frontend and Node.js/Express backend, featuring JWT authentication, a shopping cart, order management, and an admin dashboard.

**Live Demo:** [originalite-shop.vercel.app](https://originalite-shop.vercel.app)
**API:** [originalite-server.onrender.com/api](https://originalite-server.onrender.com/api)

---

## Tech Stack

### Backend
| Layer | Technology |
|-------|-----------|
| Runtime | Node.js |
| Framework | Express 4 |
| Database | MongoDB Atlas + Mongoose 5 |
| Auth | Passport.js · JWT (access + refresh tokens) |
| Email | Nodemailer (Gmail SMTP) |
| Validation | validator.js |
| File Uploads | Multer |

### Frontend
| Layer | Technology |
|-------|-----------|
| UI Library | React 18 + TypeScript |
| State Management | Redux Toolkit + redux-persist |
| Routing | React Router DOM v6 |
| UI Framework | Material UI v5 + styled-components |
| HTTP | Axios (with auto token-refresh interceptors) |
| Forms | Formik + Yup |
| Animations | Framer Motion |
| Charts | ApexCharts |

---

## Features

- **Authentication** — JWT access tokens (15 min) + httpOnly refresh tokens (7 days), email verification on sign-up
- **Product Catalog** — Filtering by category, color, price range; full-text search; pagination
- **Shopping Cart** — Add/remove/update items, discount code validation, guest + registered user carts
- **Orders** — Place orders, email confirmations, order history, cancel orders
- **Wishlist** — Save products across sessions
- **User Profile** — Edit personal info, change password, address book, order history
- **Admin Panel** — Product editor, dashboard with charts, user management
- **Discount System** — Promo codes with expiry dates, usage limits, flat or percentage values

---

## Project Structure

```
Originalite-project/
├── config/               # CORS, Passport strategies, env keys
├── controllers/          # Business logic (18 controllers)
├── middleware/           # Credentials CORS middleware
├── models/               # Mongoose schemas (19 models)
├── routers/              # API route definitions (17 files)
├── utils/                # Token generation helpers
├── validation/           # FormValidator class + validation rules
├── commonHelpers/        # queryCreator, filterParser, mailSender
├── index.js              # Express server entry point
├── package.json
└── client/               # React frontend
    └── src/
        ├── @main/        # Main shopping app (home, product list, cart, orders)
        ├── @profile/     # User account pages
        ├── @editor/      # Admin panel
        ├── components/   # Header, Footer, shared UI
        ├── routes/       # Route configuration
        ├── services/     # Axios instances + API functions
        ├── store/        # Redux store + slices
        ├── hooks/        # Custom React hooks
        ├── theme/        # MUI theme config
        └── utils/        # Frontend helpers
```

---

## Getting Started

### Prerequisites

- Node.js >= 16
- npm >= 8
- A MongoDB Atlas cluster
- A Gmail account with an App Password for Nodemailer

### 1. Clone the repository

```bash
git clone https://github.com/VicTyslenko/Originalite-project.git
cd Originalite-project
```

### 2. Configure environment variables

Create a `.env` file in the project root:

```env
PORT=4444
NODE_ENV=development

MONGO_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/<dbname>

SECRET_OR_KEY=your_jwt_access_secret
SECRET_REFRESH_KEY=your_jwt_refresh_secret

NODEMAILER_USER=your@gmail.com
NODEMAILER_PASSWORD=your_gmail_app_password
NODEMAILER_SERVICE=gmail
```

Create `client/.env` for the frontend:

```env
REACT_APP_API_URL=http://localhost:4444/api
```

### 3. Install dependencies & start

```bash
# Backend (from project root)
npm install
npm run dev          # starts on http://localhost:4444

# Frontend (in a separate terminal)
cd client
npm install
npm start            # starts on http://localhost:3000
```

---

## API Overview

| Prefix | Resource |
|--------|---------|
| `POST /api/customers` | Register |
| `POST /api/customers/login` | Login |
| `GET  /api/customers/refresh` | Refresh access token |
| `POST /api/customers/logout` | Logout |
| `GET  /api/products` | Product list (paginated + filtered) |
| `POST /api/products/search` | Full-text product search |
| `GET  /api/cart` | Get cart |
| `PUT  /api/cart/:productId` | Add product to cart |
| `POST /api/orders` | Place order |
| `GET  /api/orders` | Get user's orders |
| `GET  /api/catalog` | Product categories |
| `GET  /api/filters` | Available filters |
| `GET  /api/colors` | Available colors |

---

## Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `PORT` | No | Server port (default: 4444) |
| `MONGO_URI` | Yes | MongoDB Atlas connection string |
| `SECRET_OR_KEY` | Yes | JWT access token secret |
| `SECRET_REFRESH_KEY` | Yes | JWT refresh token secret |
| `NODEMAILER_USER` | Yes | Gmail address for sending emails |
| `NODEMAILER_PASSWORD` | Yes | Gmail App Password |
| `NODEMAILER_SERVICE` | Yes | Email service (e.g. `gmail`) |
| `NODE_ENV` | No | `development` or `production` |

---

## Deployment

| Service | Platform |
|---------|---------|
| Frontend | [Vercel](https://vercel.com) |
| Backend | [Render](https://render.com) |
| Database | [MongoDB Atlas](https://cloud.mongodb.com) |

Set all environment variables in the respective platform dashboards — never commit secrets to source control.

---

## Scripts

### Backend (root)
```bash
npm run dev      # Start with nodemon (auto-reload)
npm start        # Start in production
```

### Frontend (client/)
```bash
npm start        # Dev server on :3000
npm run build    # Production build
npm test         # Run tests
npm run lint     # ESLint with auto-fix
npm run format   # Prettier formatting
```

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'feat: add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request against `main`

---

## License

MIT
