import React from "react";
import { Modal } from "rsuite";
import { FaWhatsapp } from "react-icons/fa";
import { HiOutlineShieldCheck } from "react-icons/hi";
import payment from "../../../../assets/images/payment.jpeg";
import { useSelector } from "react-redux";
import "rsuite/dist/rsuite.min.css";
import "./paymentModal.scss";

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
    `\n\nИтого: ${discountedPrice} сом${promoApplied ? " (со скидкой 20%)" : ""
    }`;

  const whatsappLink = `https://wa.me/996709317635?text=${encodeURIComponent(
    orderText
  )}`;

  return (
    <Modal open={isOpen} onClose={onClose} size="sm" className="payment-modal">
      <Modal.Header>
        <Modal.Title>
          <div className="payment-modal__title-wrap">
            <h3>Завершите оплату</h3>
          </div>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="payment-modal__body">


          <div className="payment-modal__image-wrap">
            <img src={payment} alt="Реквизиты для оплаты" />
          </div>

          <div className="payment-modal__notice">
            <HiOutlineShieldCheck />
            <span>После отправки чека менеджер подтвердит ваш заказ.</span>
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <div className="payment-modal__footer">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="payment-modal__whatsapp"
          >
            <FaWhatsapp />
            <span>Отправить чек в WhatsApp</span>
          </a>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default PaymentModal;
