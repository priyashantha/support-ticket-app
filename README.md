# Support Ticket System — React Frontend

This is the React.js frontend for the Support Ticket System. It allows customers to submit support tickets and check their status, and support agents to log in, view, and respond to tickets.

---

## Features

- Open support tickets without login
- Check ticket status by reference number
- Agent login with token-based auth
- Admin dashboard for support agents
    - View/search/paginate tickets
    - Highlight new tickets
    - View ticket details & reply

---

## ⚙️ Technologies

- React.js (with Hooks and Context API)
- React Router DOM
- Axios
- Tailwind CSS
- Laravel Sanctum token auth (via API)

---

## Setup Instructions

### 1. Clone the project

```bash
git clone https://github.com/priyashantha/support-ticket-app.git
cd support-ticket-app
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Configure environment
- Create a `.env` file in the root directory and set the API URL:

```env
TICKETS_API_BASE_URL=https://support-ticket-api.ddev.site
```

### 4. Start the app

```bash
npm run dev
# or
yarn dev
```

---

## Testing
* Open ticket via /open-ticket 
* Check status via /check-status 
* Agent login via /login 
* Once logged in, access:
  * /agent-dashboard — ticket list with pagination & search 
  * /agent/tickets/:reference — ticket detail view & reply form

---


