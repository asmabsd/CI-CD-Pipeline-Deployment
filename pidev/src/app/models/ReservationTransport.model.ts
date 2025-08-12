import { User } from './user.model';
import { Transport } from './transport';



export interface ReservationTransport {
  id?: number;
  departPoint: string;
  destination: string;
  departureHour: Date;
  nbrpersonne: number;
  user?: User;
  transport?: Transport;
}