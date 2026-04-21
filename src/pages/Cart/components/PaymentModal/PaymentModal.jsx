import React from "react";
import { Modal } from "rsuite";
import { FaWhatsapp } from "react-icons/fa";
import payment from "../../../../assets/images/payment2.png";
import { useSelector } from "react-redux";
import "rsuite/dist/rsuite.min.css";

const PaymentModal = ({ isOpen, onClose, promoApplied, discount }) => {
  const cart = useSelector((state) => state.cart.cart);

  const getTotalPrice = () =>
    cart.reduce(
      (sum, item) => sum + Math.round(item.price) * item.quantity,
      0
    );
  const discountedPrice = Math.round(getTotalPrice() * (1 - (discount || 0)));

  const orderText =
    "Здравствуйте! Пишу по поводу заказа. Вот детали заказа:\n" +
    cart
      .map(
        (item, idx) =>
          `${idx + 1}) ${item.title} — ${item.quantity} шт. (${item.price} сом)`
      )
      .join("\n") +
    `\n\nИтого: ${discountedPrice} сом${promoApplied ? " (со скидкой 20%)" : ""}`;


  const whatsappLink = `https://wa.me/996700762347?text=${encodeURIComponent(
    orderText
  )}`;

  return (
    <Modal open={isOpen} onClose={onClose} size="xs">
      <Modal.Header>
        <Modal.Title
          style={{
            fontWeight: 600,
            fontSize: 24,
            textAlign: "center",
          }}
        >
          Оплата
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p
          style={{
            marginBottom: 12,
            color: "#444",
            textAlign: "center",
          }}
        >
          Произведите оплату по этим реквизитам и отправьте чек на WhatsApp
        </p>
        <img
          src={payment}
          alt="Реквизиты для оплаты"
          style={{
            width: "100%",
            maxWidth: 300,
            maxHeight: 370,
            borderRadius: 10,
            border: "1px solid #eee",
            margin: "0 auto",
            display: "block",
          }}
        />
      </Modal.Body>
      <Modal.Footer>
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
            background: "#22c55e",
            color: "#fff",
            fontWeight: 500,
            fontSize: 18,
            padding: "12px 0",
            borderRadius: 8,
            textDecoration: "none",
            marginTop: 8,
          }}
        >
          <FaWhatsapp style={{ fontSize: 32 }} />
          <span>Отправить чек</span>
        </a>
      </Modal.Footer>
    </Modal>
  );
};

export default PaymentModal;