from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from typing import List

from sqlmodel import Session

from .database import create_db_and_tables, get_session
from .models import Product, ProductCreate, OrderCreate, Order
from .crud import get_products, get_product, create_product, create_order, get_orders

app = FastAPI(title="KDelight API")

# CORS para desarrollo: ajustar orígenes en producción
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Servir archivos estáticos (imágenes) desde server/app/static
# Asegúrate de que las imágenes estén en: server/app/static/images/
app.mount("/static", StaticFiles(directory="app/static"), name="static")


@app.on_event("startup")
def on_startup():
    # Crea tablas si no existen
    create_db_and_tables()


@app.get("/health")
def health():
    return {"status": "ok"}


@app.get("/products", response_model=List[Product])
def api_get_products(session: Session = Depends(get_session)):
    return get_products(session)


@app.get("/products/{product_id}", response_model=Product)
def api_get_product(product_id: int, session: Session = Depends(get_session)):
    p = get_product(session, product_id)
    if not p:
        raise HTTPException(status_code=404, detail="Product not found")
    return p


@app.post("/products", response_model=Product)
def api_create_product(payload: ProductCreate, session: Session = Depends(get_session)):
    return create_product(session, payload.dict())


@app.get("/orders", response_model=List[Order])
def api_get_orders(session: Session = Depends(get_session)):
    return get_orders(session)


@app.post("/orders")
def api_create_order(payload: OrderCreate, session: Session = Depends(get_session)):
    order = create_order(session, payload.items, payload.total)
    return {"id": order.id}