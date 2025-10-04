# NestJS + PgBoss Queue Demo

This is a **dummy project** built with [NestJS](https://nestjs.com/) and [PgBoss](https://github.com/timgit/pg-boss) to learn how to manage background jobs/queues with PostgreSQL.

---

## 🚀 Features
- NestJS backend with PgBoss queue integration  
- Two queues: **HeavyQueue** and **LightQueue**  
- Insert tasks into queues with optional priority  
- Fetch and complete queue items  
- Process jobs from queues (`Heavy` vs `Light`)  
- Rearrange queue data by priority  

---

## ⚙️ Prerequisites
- **Node.js** (>= 18.x recommended)  
- **PostgreSQL** (running locally on port `5432`)  
- **PgBoss** installed in PostgreSQL schema  

---

## 📦 Installation

### 1. Clone & Setup
```bash
git clone <your-repo-url>
cd <your-project>
npm install
