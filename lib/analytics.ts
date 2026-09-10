/**
 * ============================================================
 * ANALYTICS
 * ============================================================
 * Centralized, env-driven analytics configuration. No tracking
 * ID is ever hardcoded — each one is read from an environment
 * variable and the corresponding script only loads if that
 * variable is set. See .env.example for the full list.
 * ============================================================
 */

export const analyticsConfig = {
  gaMeasurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "",
  gtmId: process.env.NEXT_PUBLIC_GTM_ID || "",
  metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID || "",
  linkedInInsightTagId: process.env.NEXT_PUBLIC_LINKEDIN_INSIGHT_TAG_ID || "",
};

export const analyticsEnabled = Object.values(analyticsConfig).some(Boolean);
