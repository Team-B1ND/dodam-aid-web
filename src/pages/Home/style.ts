import { colors, shapes } from "@b1nd/dodam-design-system";
import styled from "@emotion/styled";
import { motion } from "framer-motion";

/* ─── Breakpoints ────────────────────────────────────── */
const bp = {
  lg: "@media (max-width: 1024px)",
  md: "@media (max-width: 768px)",
  sm: "@media (max-width: 480px)",
} as const;

/* ─── Shared ─────────────────────────────────────────── */
export const Page = styled.div`
  width: 100%;
  overflow-x: hidden;
`;

export const Inner = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 0 24px;
  margin: 0 auto;
  box-sizing: border-box;
`;

/* ─── 1. Hero ─────────────────────────────────────────── */
export const HeroSection = styled.section`
  width: 100%;
  background-color: ${colors.background.default};
  display: flex;
  justify-content: center;
`;

export const HeroInner = styled(Inner)`
  height: 800px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  overflow: hidden;

  ${bp.lg} { height: 640px; }
  ${bp.md} { height: auto; padding-top: 80px; padding-bottom: 80px; }
`;

export const HeroTitleBlock = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;
`;

export const HeroLine = styled(motion.p)<{ $blue?: boolean }>`
  margin: 0;
  font-family: "Pretendard", sans-serif;
  font-weight: 800;
  font-size: 72px;
  line-height: 1.3;
  letter-spacing: -0.03em;
  color: ${({ $blue }) => ($blue ? colors.brand.primary : colors.text.primary)};

  span { font: inherit; }
  span.blue { color: ${colors.brand.primary}; }
  span.white { color: ${colors.text.primary}; }

  ${bp.lg} { font-size: 56px; }
  ${bp.md} { font-size: 44px; }
  ${bp.sm} { font-size: 36px; }
`;

/* Phone1: left 542px, top 315px (피그마 기준, md 이하에선 숨김) */
export const Phone1 = styled(motion.div)`
  position: absolute;
  left: 542px;
  top: 315px;
  width: 426px;
  height: 378px;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;

  ${bp.lg} { left: auto; right: -60px; top: 50%; transform: translateY(-60%) !important; width: 320px; height: 280px; }
  ${bp.md} { display: none; }
`;

export const Phone2 = styled(motion.div)`
  position: absolute;
  left: 786px;
  top: 110px;
  width: 414px;
  height: 410px;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;

  ${bp.lg} { left: auto; right: 160px; top: 40px; width: 240px; height: 260px; }
  ${bp.md} { display: none; }
`;

/* ─── 2. Blue Section ─────────────────────────────────── */
export const BlueSection = styled.section`
  width: 100%;
  background-color: ${colors.brand.primary};
  display: flex;
  justify-content: center;
`;

export const BlueInner = styled(Inner)`
  height: 800px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-bottom: 84px;
  gap: 0;

  ${bp.lg} { height: auto; padding-top: 80px; padding-bottom: 60px; gap: 48px; }
  ${bp.md} { padding-top: 64px; padding-bottom: 48px; gap: 40px; }
`;

export const BlueCopy = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${bp.lg} { flex-direction: column; align-items: flex-start; gap: 32px; flex: none; }
`;

export const BlueHeadline = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const BlueHeadlineLine = styled.p`
  margin: 0;
  font-family: "Pretendard", sans-serif;
  font-weight: 700;
  font-size: 56px;
  line-height: 1.3;
  letter-spacing: -0.03em;
  color: ${colors.static.white};

  ${bp.lg} { font-size: 44px; }
  ${bp.md} { font-size: 36px; }
  ${bp.sm} { font-size: 28px; }
`;

export const BlueSubtitle = styled(motion.div)`
  display: flex;
  flex-direction: column;
`;

export const BlueSubtitleLine = styled.p`
  margin: 0;
  font-family: "Pretendard", sans-serif;
  font-weight: 400;
  font-size: 32px;
  line-height: 1.4;
  letter-spacing: -0.03em;
  color: rgba(255, 255, 255, 0.8);

  ${bp.lg} { font-size: 24px; }
  ${bp.md} { font-size: 20px; }
  ${bp.sm} { font-size: 18px; }
`;

/* Marquee */
export const MarqueeWrapper = styled.div`
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  overflow: hidden;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const MarqueeTrack = styled.div`
  display: flex;
  gap: 16px;
  width: max-content;
`;

export const ServiceTag = styled.div`
  background-color: ${colors.background.default};
  padding: 10px 18px;
  border-radius: 100px;
  flex-shrink: 0;

  p {
    margin: 0;
    font-family: "Pretendard", sans-serif;
    font-weight: 500;
    font-size: 24px;
    line-height: 1.3;
    letter-spacing: -0.03em;
    color: ${colors.text.secondary};
    white-space: nowrap;
  }

  ${bp.md} {
    padding: 8px 14px;
    p { font-size: 18px; }
  }

  ${bp.sm} {
    p { font-size: 16px; }
  }
`;

/* ─── 3. Features Section ─────────────────────────────── */
export const FeaturesSection = styled.section`
  width: 100%;
  background-color: ${colors.background.default};
  display: flex;
  justify-content: center;
`;

export const FeaturesInner = styled(Inner)`
  padding-top: 144px;
  padding-bottom: 144px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 40px;

  ${bp.lg} { padding-top: 100px; padding-bottom: 100px; }
  ${bp.md} { flex-direction: column; padding-top: 72px; padding-bottom: 72px; gap: 48px; }
`;

export const FeaturesStickyTitle = styled(motion.div)`
  flex-shrink: 0;
  position: sticky;
  top: 96px;

  ${bp.md} { position: static; }
`;

export const FeaturesSectionTitle = styled.div`
  font-family: "Pretendard", sans-serif;
  font-weight: 800;
  font-size: 36px;
  line-height: 1.3;
  letter-spacing: -0.03em;
  color: ${colors.text.primary};

  p { font: inherit; margin: 0; }

  ${bp.lg} { font-size: 28px; }
  ${bp.md} { font-size: 26px; }
`;

export const FeaturesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 64px;
  width: 740px;

  ${bp.lg} { width: 100%; max-width: 600px; }
  ${bp.md} { width: 100%; max-width: 100%; gap: 48px; }
`;

export const FeatureItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 36px;

  ${bp.md} { gap: 24px; }
  ${bp.sm} { flex-direction: column; align-items: flex-start; gap: 20px; }
`;

export const FeatureImageBox = styled.div`
  width: 200px;
  height: 280px;
  border-radius: ${shapes.large}px;
  background-color: ${colors.brand.primary};
  flex-shrink: 0;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  ${bp.lg} { width: 160px; height: 220px; }
  ${bp.md} { width: 140px; height: 200px; }
  ${bp.sm} { width: 100%; height: 160px; border-radius: ${shapes.medium}px; }
`;

export const FeatureText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const FeatureTitle = styled.div`
  font-family: "Pretendard", sans-serif;
  font-weight: 700;
  font-size: 32px;
  line-height: 1.3;
  letter-spacing: -0.03em;
  color: ${colors.text.primary};

  p { margin: 0; font: inherit; }

  ${bp.lg} { font-size: 26px; }
  ${bp.md} { font-size: 24px; }
  ${bp.sm} { font-size: 22px; }
`;

export const FeatureDesc = styled.div`
  font-family: "Pretendard", sans-serif;
  font-weight: 400;
  font-size: 18px;
  line-height: 1.6;
  letter-spacing: -0.02em;
  color: ${colors.text.tertiary};

  p { margin: 0; font: inherit; }

  ${bp.md} { font-size: 16px; }
`;

/* ─── 4. Growth / CTA Section ─────────────────────────── */
export const GrowthSection = styled.section`
  width: 100%;
  background-color: ${colors.fill.secondary};
  display: flex;
  justify-content: center;
`;

export const GrowthInner = styled(Inner)`
  padding-top: 144px;
  padding-bottom: 144px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 56px;

  ${bp.lg} { padding-top: 100px; padding-bottom: 100px; }
  ${bp.md} { padding-top: 72px; padding-bottom: 72px; gap: 40px; }
`;

export const GrowthHeader = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  text-align: center;
`;

export const GrowthTitle = styled.div`
  font-family: "Pretendard", sans-serif;
  font-weight: 800;
  font-size: 36px;
  line-height: 1.3;
  letter-spacing: -0.03em;
  color: ${colors.text.primary};

  p { margin: 0; font: inherit; }

  ${bp.md} { font-size: 28px; }
  ${bp.sm} { font-size: 24px; }
`;

export const GrowthSubtitle = styled.p`
  margin: 0;
  font-family: "Pretendard", sans-serif;
  font-weight: 400;
  font-size: 24px;
  line-height: 1.3;
  letter-spacing: -0.03em;
  color: ${colors.text.tertiary};

  ${bp.md} { font-size: 18px; }
`;

export const GrowthCards = styled.div`
  display: flex;
  gap: 16px;
  width: 100%;

  ${bp.md} { flex-direction: column; }
`;

export const GrowthCard = styled(motion.div)`
  background-color: ${colors.background.surface};
  border-radius: ${shapes.extraLarge}px;
  flex: 1;
  height: 360px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 36px 24px;
  gap: 24px;

  ${bp.md} { height: auto; min-height: 280px; border-radius: ${shapes.large}px; }
`;

export const GrowthCardTitle = styled.p`
  margin: 0;
  font-family: "Pretendard", sans-serif;
  font-weight: 500;
  font-size: 22px;
  line-height: 1.3;
  letter-spacing: -0.03em;
  color: ${colors.text.secondary};
  text-align: center;

  ${bp.sm} { font-size: 18px; }
`;

/* Phone mockup for card 1 */
export const PhoneMockup = styled.div`
  flex: 1;
  width: 100%;
  max-width: 260px;
  border: 8px solid ${colors.border.normal};
  border-bottom: none;
  border-radius: 40px 40px 0 0;
  padding: 20px 10px 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow: hidden;
  align-self: flex-end;
`;

export const MockupNotification = styled.div`
  background-color: ${colors.fill.secondary};
  border-radius: 20px;
  height: 56px;
  display: flex;
  align-items: center;
  padding: 0 12px;
  gap: 10px;
  flex-shrink: 0;
`;

export const MockupAppIcon = styled.div`
  width: 36px;
  height: 36px;
  background-color: ${colors.background.surface};
  border-radius: ${shapes.small}px;
  flex-shrink: 0;
`;

export const MockupTextLines = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const MockupLine = styled.div<{ $width: number }>`
  height: 8px;
  width: ${({ $width }) => $width}px;
  background-color: ${colors.border.normal};
  border-radius: 4px;
`;

/* Star rating for card 2 */
export const StarRatingContent = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  gap: 16px;
`;

export const RatingNumber = styled.div`
  font-family: "Pretendard", sans-serif;
  font-weight: 800;
  font-size: 80px;
  line-height: 1;
  letter-spacing: -0.04em;
  color: ${colors.text.primary};

  ${bp.md} { font-size: 64px; }
`;

export const StarRow = styled.div`
  display: flex;
  gap: 6px;
`;

export const StarSvg = styled.div<{ $filled?: boolean }>`
  color: ${({ $filled }) => ($filled ? "#FFD600" : colors.border.normal)};
  display: flex;
`;

/* ─── 5. Final CTA ───────────────────────────────────── */
export const FinalCTASection = styled.section`
  width: 100%;
  background-color: ${colors.background.default};
  display: flex;
  justify-content: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: -300px;
    left: 50%;
    transform: translateX(-50%);
    width: 900px;
    height: 900px;
    background: radial-gradient(
      ellipse at center,
      ${colors.brand.primary}30 0%,
      ${colors.brand.primary}08 50%,
      transparent 70%
    );
    pointer-events: none;
  }
`;

export const FinalCTAInner = styled(Inner)`
  padding: 160px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0;
  position: relative;
  z-index: 1;

  ${bp.lg} { padding: 120px 24px; }
  ${bp.md} { padding: 96px 24px; }
  ${bp.sm} { padding: 72px 24px; }
`;

export const FinalCTAEyebrow = styled(motion.p)`
  margin: 0 0 24px;
  font-family: "Pretendard", sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 1.4;
  letter-spacing: 0.08em;
  color: ${colors.brand.primary};
  text-transform: uppercase;
`;

export const FinalCTATitle = styled(motion.div)`
  font-family: "Pretendard", sans-serif;
  font-weight: 800;
  font-size: 64px;
  line-height: 1.2;
  letter-spacing: -0.03em;
  color: ${colors.text.primary};
  margin-bottom: 20px;

  p { margin: 0; font: inherit; }
  span { color: ${colors.brand.primary}; font: inherit; }

  ${bp.lg} { font-size: 52px; }
  ${bp.md} { font-size: 40px; }
  ${bp.sm} { font-size: 32px; }
`;

export const FinalCTADesc = styled(motion.p)`
  margin: 0 0 48px;
  font-family: "Pretendard", sans-serif;
  font-weight: 400;
  font-size: 20px;
  line-height: 1.7;
  letter-spacing: -0.01em;
  color: ${colors.text.tertiary};
  max-width: 440px;
  word-break: keep-all;

  ${bp.md} { font-size: 17px; margin-bottom: 36px; }
`;

export const FinalCTAButton = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 16px 36px;
  border-radius: 100px;
  background: ${colors.brand.primary};
  color: ${colors.static.white};
  font-family: "Pretendard", sans-serif;
  font-weight: 700;
  font-size: 18px;
  line-height: 1.4;
  letter-spacing: -0.01em;
  cursor: pointer;
  box-shadow: 0 0 40px ${colors.brand.primary}40;
  transition: opacity 0.18s, transform 0.18s, box-shadow 0.18s;

  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
    box-shadow: 0 8px 48px ${colors.brand.primary}60;
  }

  &:active {
    transform: translateY(0);
    opacity: 1;
  }

  ${bp.sm} { font-size: 16px; padding: 14px 28px; }
`;
