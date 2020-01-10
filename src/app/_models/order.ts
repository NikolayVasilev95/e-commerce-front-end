import { OrderDetail } from './order-detail';

export class Order {
    id: number;
    dateCreated: string;
    orderDetails: OrderDetail[];
}
