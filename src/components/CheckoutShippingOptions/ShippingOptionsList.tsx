import classNames from "classnames";
import * as React from "react";

import { Checkout } from "../CheckoutApp/types/Checkout";

const ShippingOptionsList: React.SFC<{
  checkout: Checkout;
  selected: string;
  onShippingSelect(shippingId: string): void;
}> = ({ checkout, selected, onShippingSelect }) => (
  <div className="checkout-shipping-options__form">
    {checkout.availableShippingMethods.map(method => {
      const isSelected = selected === method.id;
      return (
        <div
          key={method.id}
          className={classNames("checkout-shipping-options__form__option", {
            "checkout-shipping-options__form__option--selected": isSelected
          })}
          onClick={() => onShippingSelect(method.id)}
        >
          <input type="radio" name="shippingOprtions" value={method.id} />
          <label>
            {method.name} | +{method.price.localized}
          </label>
        </div>
      );
    })}
  </div>
);

export default ShippingOptionsList;
