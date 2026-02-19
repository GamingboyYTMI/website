
import React from 'react';
import { VehicleType, WashPackage, ServiceDetail } from './types';

export const SERVICES: ServiceDetail[] = [
  // Bikes
  {
    id: 'b1',
    name: WashPackage.BASIC,
    price: 299,
    duration: '30 mins',
    vehicleType: VehicleType.BIKE,
    features: ['Pressure Wash', 'Chain Cleaning', 'Tyre Dressing']
  },
  {
    id: 'b2',
    name: WashPackage.PREMIUM,
    price: 699,
    duration: '60 mins',
    vehicleType: VehicleType.BIKE,
    features: ['Detail Hand Wash', 'Polish & Wax', 'Engine Degreasing', 'Chain Lube']
  },
  // Cars
  {
    id: 'c1',
    name: WashPackage.BASIC,
    price: 599,
    duration: '45 mins',
    vehicleType: VehicleType.CAR,
    features: ['Exterior Wash', 'Vacuuming', 'Window Cleaning', 'Tyre Shine']
  },
  {
    id: 'c2',
    name: WashPackage.PREMIUM,
    price: 1499,
    duration: '90 mins',
    vehicleType: VehicleType.CAR,
    features: ['Deep Interior Clean', 'Steam Sanitize', 'Clay Bar Treatment', 'Wax Finish']
  },
  {
    id: 'c3',
    name: WashPackage.ULTIMATE,
    price: 4999,
    duration: '180 mins',
    vehicleType: VehicleType.CAR,
    features: ['Ceramic Coating Sealant', 'Leather Conditioning', 'Engine Bay Detail', 'Full Paint Decontamination']
  },
  // SUVs
  {
    id: 's1',
    name: WashPackage.PREMIUM,
    price: 1999,
    duration: '120 mins',
    vehicleType: VehicleType.SUV,
    features: ['All Car Premium Features', 'Undercarriage Wash', 'Mat Restoration']
  }
];
