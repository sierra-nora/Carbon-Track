/*
 CarbonTrack emission-factor notes

 The calculator uses transparent screening factors. They are not a certified
 inventory and should be reviewed with your supervisor before formal publication.

 Electricity:
   0.72 kg CO2e/kWh is retained as a provisional grid-screening value.
   Replace it with the India-specific grid factor selected from an official
   source for your reporting year.

 Transport:
   car     0.18 kg CO2e/km
   bike    0.09 kg CO2e/km
   bus     0.05 kg CO2e/km
   metro   0.035 kg CO2e/km
   auto    0.11 kg CO2e/km
   walk    0

 These are simplified distance-based screening values. A formal calculator
 should instead use vehicle/fuel type, fuel economy, occupancy and a cited
 conversion-factor table.

 Food:
   The current interface asks for a diet pattern rather than food mass, so
   these are monthly screening proxies, not kg-per-kg food factors:
   plant = 35, mixed = 55, meat = 85

 Waste and consumption:
   These are simplified screening scores because the interface does not
   collect measured kilograms of waste or purchase spending. They should not
   be described as universal physical emission factors.

 Sources consulted:
   - UK DESNZ, Greenhouse gas reporting: conversion factors 2026
   - Our World in Data, Environmental Impacts of Food
   - Poore and Nemecek (2018), as processed by Our World in Data
*/
const EMISSION_FACTORS = {
  transport: {
    car: 0.18,
    bike: 0.09,
    bus: 0.05,
    metro: 0.035,
    auto: 0.11,
    walk: 0
  },
  electricity: 0.72,
  food: {
    plant: 35,
    mixed: 55,
    meat: 85,
    wasteLow: 3,
    wasteMedium: 7,
    wasteHigh: 13,
    eatingOut: 4,
    delivery: 5
  },
  waste: {
    low: 5,
    medium: 12,
    high: 21,
    recycleBonus: 0.82
  },
  consumption: {
    clothingLow: 3,
    clothingMedium: 8,
    clothingHigh: 16,
    electronicsLow: 2,
    electronicsMedium: 6,
    electronicsHigh: 12,
    onlineLow: 2,
    onlineMedium: 5,
    onlineHigh: 10
  }
};
