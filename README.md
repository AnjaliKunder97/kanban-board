# Real-Time Collaborative Kanban Board

A Trello-style Kanban board built with Vue 3 and Nuxt 3, featuring live
multi-client synchronization via Socket.io - drag a card in one browser
tab and watch it move in another, in real time.

## Tech stack

- **Nuxt 3** - Vue 3 framework with file-based routing and SSR
- **Pinia** - state management
- **TypeScript** - throughout
- **Socket.io** - real-time sync between connected clients
- **vue-draggable-next** - drag-and-drop card interactions

## Architecture note

This project has **two separate running processes**:

1. **The Nuxt app** (`npm run dev`) - the actual web application
2. **A minimal Socket.io relay server** (`server-realtime/server.cjs`) -
   a small, deliberately simple real-time relay (~30 lines) that
   broadcasts board state changes between connected clients. It's
   in-memory only (no database) and has no authentication - this is
   intentional, to keep the project focused on demonstrating real-time
   frontend integration rather than building a full backend.

**Both must be running at the same time** for the app to work correctly.

## Prerequisites

- Node.js 18.19+ or 20.11+ (check with `node --version`)

## Setup

```bash
git clone <this-repo-url>
cd kanban-board
npm install
```

## Running the project (two terminals required)

**Terminal 1 - the Nuxt app:**
```bash
npm run dev
```
This starts the web app at `http://localhost:3000`.

**Terminal 2 - the real-time server:**
```bash
cd server-realtime
node server.cjs
```
You should see `Realtime server running on port 4000`. Leave this
terminal open and running the whole time you're using the app - if you
close it, real-time sync stops working (you'll see a
`ERR_CONNECTION_REFUSED` error in the browser console, which just means
this server isn't running).

## Trying out the real-time sync

1. Go to `http://localhost:3000`
2. Click **Create New Board**
3. Copy the URL you land on (something like `http://localhost:3000/board/a1b2c3d4`)
4. Open that **exact same URL** in a second browser tab or an incognito window
5. Add a card, or drag a card between lists, in one tab
6. Watch it appear/move in the other tab within a second or two

## Project structure