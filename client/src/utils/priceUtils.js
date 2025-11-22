// Consolidated price utilities used across the app.
// Re-export existing implementations to avoid duplicating logic.
export { pricewithDiscount } from './PriceWithDiscount';
export { DisplayPriceInRupees } from './DisplayPriceInRupees';

// NOTE: Keep this file lightweight — it simply aggregates exports so
// code can import both helpers from a single path: ../utils/priceUtils
