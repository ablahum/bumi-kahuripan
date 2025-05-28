# Bumi Kahuripan

**Bumi Kahuripan** is a custom-built web application developed for a local guesthouse to digitize and simplify manual bookkeeping and financial tracking processes. The system is designed with a conservative yet efficient workflow in mind, addressing real-world operational issues faced by the client.

## 🚀 Key Features

### Dashboard Overview

- Automatic calculation of total daily, weekly, monthly, and yearly guests
- Real-time gross profit summary

### Guest Management

- Record and track guest check-ins and check-outs
- Automatic check-out when today's date is the same as the check-out date
- Maintain guest history

### Rooms Management

- Manage room availability data
- Manage the room base price and its types

### Settings

- Manage the price increase in room rates based on their type (AC/Non-AC)

### Authentication

- Register & Login based on the user's role (admin & super admin)

## 🛠️ Tech Stack

### Frontend:

- Tailwind
- Vue.js
- Vite

### Backend:

- Laravel
- Sanctum
- Eloquent

### Database:

- PostgreSQL

## ⚙️ Installation

To run this project locally, ensure you have PHP, Composer, Node.js, and PostgreSQL installed on your machine.

- Clone the repository

```
git clone https://github.com/ablahum/bumi-kahuripan.git
cd bumi-kahuripan
```

- Install PHP and JavaScript dependencies

```
composer install
npm install
```

- Set up environment

```
cp .env.example .env
php artisan key:generate
```

- Configure your database in the .env file
- Then run migrations (and seeders if available)

```
php artisan migrate
```

- Run the development server

```
php artisan serve
```

- Run Vite for frontend assets

```
npm run dev
```

## 📝 API Documentation:

The details of the API Documentation can be found here: [API Docs](./API_DOCS.md)

## 📷 Screenshots

A glimpse of screenshots of the apps

![alt text](https://github.com/ablahum/bumi-kahuripan/blob/main/public/assets/register.png)
![alt text](https://github.com/ablahum/bumi-kahuripan/blob/main/public/assets/dashboard.png)
![alt text](https://github.com/ablahum/bumi-kahuripan/blob/main/public/assets/orders.png)
![alt text](https://github.com/ablahum/bumi-kahuripan/blob/main/public/assets/form.png)
![alt text](https://github.com/ablahum/bumi-kahuripan/blob/main/public/assets/settings.png)
<!-- upload photo here -->

## 📌 Project Info

This project is a freelance solution for a real-world client and is not open for public contribution. The repository is intended for deployment and internal use only.

## 📩 Contact

For any questions or collaboration inquiries, feel free to ask me!

- **Email**: ablahum@proton.me
- **GitHub**: @ablahum
