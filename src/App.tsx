import { useEffect, useState } from "react";
import "./App.css";
import { Cart } from "./types/cart";
import { Item } from "./types/item";

function App() {
  const [cart, setCart] = useState<Cart[]>([]);
  const [total, setTotal] = useState<number>(0);

  const items: Item[] = [
    { name: "A", price: 50, discountPrice: 130, discountAmount: 3 },
    { name: "B", price: 30, discountPrice: 45, discountAmount: 2 },
    { name: "C", price: 20 },
    { name: "D", price: 15 },
  ];

  const modifyCart = (selectedItem: Item, add: boolean) => {
    setCart((prev) => {
      const itemInCart = prev.findIndex(
        (item) => item.name === selectedItem.name
      );

      if (itemInCart !== -1) {
        const updatedCart = [...prev];
        const updatedItem = { ...updatedCart[itemInCart] };

        if(add) {
          updatedItem.amount = updatedItem.amount + 1
        } else {
          updatedItem.amount = updatedItem.amount !== 0 ? updatedItem.amount - 1 : updatedItem.amount;
        }
       
        updatedCart[itemInCart] = updatedItem;

        return updatedCart;
      } else if (add) {
        return [...prev, { ...selectedItem, amount: 1 }];
      }

      return prev;
    });
  };

  useEffect(() => {
    let newTotal = 0;

    cart.forEach((item) => {
      if (item.discountAmount && item.discountPrice) {
        let quotient = Math.floor(item.amount / item.discountAmount);
        let remainder = item.amount % item.discountAmount;

        newTotal += remainder * item.price + quotient * item.discountPrice;
      } else {
        newTotal += item.price * item.amount;
      }
    });

    setTotal(newTotal);
  }, [cart]);

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-4 space-x-6">
        {items.map((item) => (
          <div
            key={item.name}
            className="text-center rounded-lg border bg-slate-700"
          >
            <div className="p-8">
              Name: {item.name}
              <br />
              Price: £{item.price}
              <br />
              {item.discountPrice ? "Discount: Buy " + item.discountAmount + " and pay " + item.discountPrice : "This product does not have a discount"}
            </div>
            <div className="grid grid-cols-2 gap-6">
              <button
                className="text-center border p-4 text-2xl rounded-bl-lg rounded-tr-lg bg-red-600"
                onClick={() => modifyCart(item, false)}
              >
                -
              </button>
              <button
                className="text-center border p-4 text-2xl rounded-br-lg rounded-tl-lg bg-green-600"
                onClick={() => modifyCart(item, true)}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
      <hr className="my-16" />
      <div className="flex justify-center gap-4 items-center mb-4">
        <h3 className="text-lg font-bold">Cart: {total}</h3>
      </div>
      <div className="flex justify-center gap-4 items-center">
      {cart.map((item) => (
          <div key={item.name}>
            <div>{item.name}</div>
            <div>{item.amount}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
