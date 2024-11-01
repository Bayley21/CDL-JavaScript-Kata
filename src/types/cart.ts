import { Item } from "./item";

export interface Cart extends Item {
    amount: number;
}