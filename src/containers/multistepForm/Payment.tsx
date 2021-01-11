import React from "react";
import styles from "./Payment.module.scss";
import { connect } from "react-redux";
import CartDetails from "../../components/cartDetails/CartDetails";
import { CardElement } from "@stripe/react-stripe-js";
import { FormikValues } from "formik";

interface Props {
  items: any;
  total: number;
  submit: (values: FormikValues) => Promise<void>;
  values: FormikValues;
}

const Payment: React.FC<Props> = ({ items, total, submit, values }) => {
  const shippingFixed = parseFloat(values.shipping.replace(",", "."));
  const totalToPay = total + shippingFixed;
  return (
    <div className={styles.grid}>
      <div className={styles.cartReview}>
        <div>
          {items &&
            items.map((item: any) => (
              <CartDetails
                item={item}
                key={`${item._id}${item.size}`}
                cart={false}
              />
            ))}
        </div>
        <div className={styles.shipping}>
          <h4>Shipping: {values.shipping}</h4>
        </div>
        <div className={styles.total}>
          <h3>Total: {totalToPay}</h3>
        </div>
      </div>
      <div className={styles.stripeContainer}>
        <CardElement />
        <button
          type="button"
          onClick={() => submit(values)}
          className={styles.backBtn}>
          pay {totalToPay}
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  const { cart } = state;
  return {
    items: cart.cartItems,
    total: cart.total,
  };
};

export default connect(mapStateToProps)(Payment);
