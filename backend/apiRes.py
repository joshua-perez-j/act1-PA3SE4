from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import mysql.connector
from mysql.connector import Error

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

DB_CONFIG = {
    'host': 'localhost',
    'user': 'joshua',
    'password': '1234',
    'database': 'act1-PE3SE4'
}

def get_db_connection():
    try:
        return mysql.connector.connect(**DB_CONFIG)
    except Error as e:
        print(f"Error conectando a la BD: {e}")
        return None

class UserCredentials(BaseModel):
    nombre: str
    contrasena: str

@app.post("/createUser")
def create_user(user: UserCredentials):
    conn = get_db_connection()
    if not conn:
        raise HTTPException(status_code=500, detail="Error interno del servidor")
    
    cursor = conn.cursor(dictionary=True)
    
    try:
        cursor.execute("SELECT nombre FROM usuarios WHERE nombre = %s", (user.nombre,))
        if cursor.fetchone():
            raise HTTPException(status_code=400, detail="Usuario ya registrado")
        
        cursor.execute("INSERT INTO usuarios (nombre, contrasena) VALUES (%s, %s)", (user.nombre, user.contrasena))
        conn.commit()
        
        return {"status": "success", "mensaje": "Usuario creado"}
    except Error as e:
        raise HTTPException(status_code=500, detail="Error de base de datos")
    finally:
        cursor.close()
        conn.close()

@app.post("/login")
def login(user: UserCredentials):
    conn = get_db_connection()
    if not conn:
        raise HTTPException(status_code=500, detail="Error interno del servidor")
    
    cursor = conn.cursor(dictionary=True)
    
    try:
        cursor.execute("SELECT contrasena FROM usuarios WHERE nombre = %s", (user.nombre,))
        db_user = cursor.fetchone()
        
        if not db_user or db_user['contrasena'] != user.contrasena:
            raise HTTPException(status_code=401, detail="Credenciales incorrectas")
        
        return {"status": "success", "nombre": user.nombre}
    finally:
        cursor.close()
        conn.close()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)