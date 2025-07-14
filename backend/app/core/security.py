import base64
import hashlib
import ecdsa
import jwt
from datetime import datetime, timedelta, timezone
from typing import Any
from passlib.context import CryptContext

from app.core.config import settings

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


ALGORITHM = "HS256"


def create_access_token(subject: str | Any, expires_delta: timedelta) -> str:
    expire = datetime.now(timezone.utc) + expires_delta
    to_encode = {"exp": expire, "sub": str(subject)}
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)


def verify_activation_token(token: str) -> str:
    ''' Defined for verify email activation token '''
    decoded_token = jwt.decode(token, settings.SECRET_KEY, algorithms=[ALGORITHM])
    return str(decoded_token["sub"])

def verify_webhook_signature(pubkey_b64: str, x_sign_b64: str, body: bytes) -> bool:
  try: 
    pubkey_pem = base64.b64decode(pubkey_b64)
    vk = ecdsa.VerifyingKey.from_pem(pubkey_pem.decode())
    signature = base64.b64decode(x_sign_b64)
    return vk.verify(signature, body, sigdecode=ecdsa.util.sigdecode_der, hashfunc=hashlib.sha256)
  except Exception as e:
    print("Signature verification failed:", type(e).__name__, str(e))