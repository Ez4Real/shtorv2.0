import httpx
from datetime import datetime
from fastapi import APIRouter, HTTPException, Request
from pydantic import BaseModel
from app.core.config import settings
from fastapi import APIRouter, Request, HTTPException, Header
from app.models import  PaymentCreate, PaymentResponse, Order, Message
from app.core.security import verify_webhook_signature
from app.api.deps import SessionDep
from typing import Any
from sqlmodel import select


router = APIRouter(prefix="/payments", tags=["payments"])


class MonoBankCallback(BaseModel):
    invoiceId: str
    status: str # "created" | "processing" | "hold" | "success" | "failure" | "reversed" |"expired"
    amount: int
    ccy: int
    failureReason: str
    errCode: str
    createdDate: datetime
    modifiedDate: int
    reference: str
    destination: str


@router.post("/", response_model=PaymentResponse)
async def create_payment(
  payment_in: PaymentCreate
):
  # print("MONOBANK_ACQUIRING_API: ", settings.MONOBANK_ACQUIRING_API)
  # print("MONOBANK_ACQUIRE_TOKEN: ", settings.MONOBANK_ACQUIRE_TOKEN)
  # print("Request URL: ", f"{settings.MONOBANK_ACQUIRING_API}/api/merchant/invoice/create")
  async with httpx.AsyncClient() as client:
    try:
      response = await client.post(
        f"{settings.MONOBANK_ACQUIRING_API}/api/merchant/invoice/create",
        json=payment_in.model_dump(),
        headers={
          "X-Token": settings.MONOBANK_ACQUIRE_TOKEN,
          "Content-Type": "application/json",
        },
      )
      return response.json() 
  
    except httpx.HTTPStatusError as exc:
      raise HTTPException(status_code=exc.response.status_code, detail=str(exc))
    except httpx.RequestError as exc:
      raise HTTPException(status_code=400, detail=str(exc))
      

# @router.get("/send-receipt")
# async def send_receipt_email(invoiceId: str, email: EmailStr):
#     response = requests.get(
#             f"{settings.MONOBANK_ACQUIRING_API}/api/merchant/invoice/receipt?invoiceId={invoiceId}",
#             headers={
#               "X-Token": settings.REACT_APP_MONO_ACQUIRE_TOKEN,
#               "Content-Type": "application/json",
#             }
#         )
#     if response.status_code != 200:
#             raise HTTPException(status_code=response.status_code, detail="Failed to fetch receipt")
        
#     receipt_base64 = response.json().get("file", "")
#     receipt_pdf_bytes = base64.b64decode(receipt_base64)

    
#     email_subject = "Your Payment Receipt from Monobank"
#     html_content = "Please find your payment receipt attached."
#     send_email(
#         email_to=email,
#         subject=email_subject,
#         html_content=html_content,
#         attachments=[("receipt.pdf", receipt_pdf_bytes, "application/pdf")]
#     )
#     return Message(message="Newsletter subscription email sent")
          
@router.post("/public-key")
async def public_key() -> Any:
    async with httpx.AsyncClient() as client:
      print("ACQUIRE TOKEN: ", settings.MONOBANK_ACQUIRE_TOKEN)
      try:
        response = await client.get(
          "https://api.monobank.ua/api/merchant/pubkey",
          headers={
            "X-Token": settings.MONOBANK_ACQUIRE_TOKEN,
            "Content-Type": "application/json",
          },
        )
        return response.json() 
    
      except httpx.HTTPStatusError as exc:
        raise HTTPException(status_code=exc.response.status_code, detail=str(exc))
      except httpx.RequestError as exc:
        raise HTTPException(status_code=400, detail=str(exc))
    
    
    
@router.get("/status/{id}")
async def payment_status(
    id: str
) -> Any:
    """
    Get product by ID.
    """
    async with httpx.AsyncClient() as client:
      try:
        response = await client.get(
          f"{settings.MONOBANK_ACQUIRING_API}/api/merchant/invoice/status?invoiceId={id}",
          headers={
            "X-Token": settings.MONOBANK_ACQUIRE_TOKEN,
            "Content-Type": "application/json",
          },
        )
        return response.json() 
    
      except httpx.HTTPStatusError as exc:
        raise HTTPException(status_code=exc.response.status_code, detail=str(exc))
      except httpx.RequestError as exc:
        raise HTTPException(status_code=400, detail=str(exc))


@router.post("/callback")
async def payment_callback(
  request: Request,
  session: SessionDep,
  x_sign: str = Header(...),
):
  """ Monobank Payment Callback """
  body = await request.body()
  verify_webhook_signature(settings.MONOBANK_PUBLIC_KEY, x_sign, body)

  try:
    data = await request.json()
    
    invoice_id = data['invoiceId']
    status = data['status']
    modified_date = datetime.strptime(data['modifiedDate'], "%Y-%m-%dT%H:%M:%SZ")
    
    order = session.exec((
      select(Order)
      .where(Order.invoiceId == invoice_id)
    )).one()
  
    if not order:
      raise HTTPException(status_code=404, detail="Order not found")
    
    if order and order.modified_date < modified_date:
      order.modified_date = modified_date
      order.payment_status = status
      session.commit()
      session.refresh(order)
      return Message(message="Order status updated successfully")

  except Exception as e:
    print("❌ Error processing Monobank callback:", str(e))
    raise HTTPException(status_code=400, detail="Invalid callback payload")