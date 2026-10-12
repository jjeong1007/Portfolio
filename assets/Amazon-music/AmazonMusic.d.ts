export interface AmazonmusicProps {
  /**
   * Variant
   * Friendly names map to internal IDs:
   *   "Desktop" → tK5CJjTke
   *   "Phone" → Sy0LbRoys
   *   "Tablet" → Z6B3YvPSL
   */
  variant?: 'Desktop' | 'Phone' | 'Tablet' | 'tK5CJjTke' | 'Z6B3YvPSL' | 'Sy0LbRoys';
  /**
   * Scroll Section — pass as `NNGrL19GU` not `scrollSection`.
   */
  NNGrL19GU?: string;
  /**
   * Scroll Section 2 — pass as `NDxn0mkHK` not `scrollSection2`.
   */
  NDxn0mkHK?: string;
  /** Additional properties */
  [key: string]: unknown;
}
