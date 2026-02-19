
export enum VehicleType {
  BIKE = 'Bike',
  CAR = 'Car',
  SUV = 'SUV/Luxury'
}

export enum WashPackage {
  BASIC = 'Express Shine',
  PREMIUM = 'Premium Deep Clean',
  ULTIMATE = 'Ultimate Ceramic Shield'
}

export interface ServiceDetail {
  id: string;
  name: WashPackage;
  price: number;
  duration: string;
  features: string[];
  vehicleType: VehicleType;
}

export interface BookingDetails {
  vehicleType: VehicleType;
  package: WashPackage;
  date: string;
  time: string;
  address: string;
  phone: string;
  specialInstructions?: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}
