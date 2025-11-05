# K'Delight Backend (FastAPI + SQLite)

Requisitos: Python 3.10+

Instalación rápida:
1. python -m venv .venv
2. Windows: .venv\Scripts\activate
   mac/Linux: source .venv/bin/activate
3. pip install -r requirements.txt
4. python -m app.seed
5. uvicorn app.main:app --reload --host 0.0.0.0 --port 3001

Notas:
- Android emulator: usar http://10.0.2.2:3001
- Dispositivo físico / Expo: usar la IP LAN de tu PC (ej. http://192.168.1.25:3001)