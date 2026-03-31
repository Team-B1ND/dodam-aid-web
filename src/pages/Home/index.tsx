import { motion, useInView, useAnimationFrame, useScroll, useMotionValueEvent } from "framer-motion";
import { useRef, useState, useEffect, useMemo, memo, Suspense } from "react";
import { Link } from "react-router-dom";
import * as S from "./style";
import DodamLogo from "../../shared/assets/images/AppIcon.png";
import { useGetMyInfoQuery } from "@/entities/users/queries";
import { ErrorBoundary } from "react-error-boundary";
import { useTheme } from "@b1nd/dodam-design-system";

const imgMockupLight = "/light_mockup.png";
const imgMockupDark = "/dark_mockup.png";

const SERVICE_TAGS = [
  "기숙사 출석체크", "포트폴리오 아카이브", "오늘의 급식 평가하기",
  "대소위키", "축구할 사람 모으기", "선생님 심부름 도와드리기",
  "대나무숲", "나만의 웹툰 연재하기", "내 깃허브 순위 보기",
  "실습동 출석체크", "내 CS 지식 수준 확인하기", "대소고 프로젝트 아카이브",
  "축제 부스 운영하기", "오늘의 익명 일기장", "대소고 기술 블로그",
  "교내 분실물 찾아주기", "프로젝트 팀원 찾기", "대소고 포토북", "고민상담소"
];

const ROW1 = SERVICE_TAGS.slice(0, 9);
const ROW2 = SERVICE_TAGS.slice(9);

const MarqueeRow = ({ tags, reverse }: { tags: string[]; reverse?: boolean }) => {
  const trackRef = useRef<HTMLDivElement>(null);

  useAnimationFrame((_, delta) => {
    const el = trackRef.current;
    if (!el) return;

    const half = el.scrollWidth / 2;
    const speed = (delta / 1000) * 55;
    const current = parseFloat(el.dataset.x ?? "0");

    let next: number;
    if (reverse) {
      next = current + speed;
      if (next >= 0) next = -half;
    } else {
      next = current - speed;
      if (next <= -half) next = 0;
    }

    el.dataset.x = String(next);
    el.style.transform = `translateX(${next}px)`;
  });

  const doubled = useMemo(() => [...tags, ...tags], [tags]);

  return (
    <S.MarqueeTrack ref={trackRef}>
      {doubled.map((tag, i) => (
        <S.ServiceTag key={i}><p>{tag}</p></S.ServiceTag>
      ))}
    </S.MarqueeTrack>
  );
};

const InfiniteMarquee = memo(() => (
  <S.MarqueeWrapper>
    <MarqueeRow tags={ROW1} />
    <MarqueeRow tags={ROW2} reverse />
  </S.MarqueeWrapper>
));

const ICON_SIZE = 80;

const DodamScrollText = memo(({ progress }: { progress: number }) => {
  const textRef = useRef<HTMLSpanElement>(null);
  const [textWidth, setTextWidth] = useState(0);

  useEffect(() => {
    if (textRef.current) setTextWidth(textRef.current.offsetWidth);
  }, []);

  const w = textWidth > 0
    ? textWidth + (ICON_SIZE - textWidth) * progress
    : undefined;

  const iconStyle = useMemo(() => ({
    position: "absolute" as const,
    left: 0,
    top: -10,
    bottom: 0,
    margin: "auto 0",
    opacity: progress,
    transform: `scale(${0.7 + 0.3 * progress})`,
  }), [progress]);

  return (
    <S.DodamSwap style={{ width: w }}>
      <span
        ref={textRef}
        className="blue"
        style={{ whiteSpace: "nowrap", opacity: 1 - progress }}
      >
        도담도담
      </span>
      <img
        src={DodamLogo}
        alt="도담도담"
        width={ICON_SIZE}
        height={ICON_SIZE}
        style={iconStyle}
      />
    </S.DodamSwap>
  );
});

const Star = memo(({ filled }: { filled?: boolean }) => (
  <S.StarSvg $filled={filled}>
    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  </S.StarSvg>
));

const FEATURES = [
  {
    title: ["도담도담", "디자인 시스템과 함께"],
    desc: ["DDS ( 도담도담 디자인 시스템 ) 를 통해", "따로 디자인 시스템을 구축하지 않고, 개발이 가능해요."],
    image: { light: "/light_dds-components.svg", dark: "/dark_dds-components.svg" },
  },
  {
    title: ["앱 업데이트 없이", "내 서비스 바로 등록 가능"],
    desc: ["내가 등록한 서비스는", "도담도담을 업데이트하지 않아도 작동해요."],
    image: { light: "/light_update-app.svg", dark: "/dark_update-app.svg" },
    reverse: true,
  },
  {
    title: ["앱없이 네이티브", "기능을 사용가능"],
    desc: ["aid-kit 을 통해 별도의 앱을 제작하지 않고도", "모바일 네이티브 기능을 사용할 수 있어요!"],
    image: { light: "/light_nfc.svg", dark: "/dark_nfc.svg" },
  },
];

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia("(max-width: 768px)").matches : false
  );
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return isMobile;
};

const Home = () => {
  const theme = useTheme();
  const isMobile = useIsMobile();
  const heroScrollRef = useRef(null);
  const blueRef = useRef(null);
  const featuresRef = useRef(null);
  const growthRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroScrollRef,
    offset: ["start start", "end end"],
  });
  const [scrollProgress, setScrollProgress] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setScrollProgress(Math.min(v * 2, 1));
  });

  const blueInView = useInView(blueRef, { once: true, margin: "-60px" });
  const featuresInView = useInView(featuresRef, { once: true, margin: "-60px" });
  const growthInView = useInView(growthRef, { once: true, margin: "-60px" });

  return (
    <S.Page>
      <S.HeroScrollArea ref={heroScrollRef}>
        <S.HeroSticky>
          <S.HeroInner>
            <S.HeroTitleBlock>
              {["내 서비스를", null, "이식하기"].map((line, i) =>
                line ? (
                  <S.HeroLine
                    key={i}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.55, delay: 0.1 + i * 0.1, ease: "easeOut" }}
                  >
                    {line}
                  </S.HeroLine>
                ) : (
                  <S.HeroLine
                    key={i}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.55, delay: 0.2, ease: "easeOut" }}
                  >
                    {isMobile ? (
                      <span className="blue">도담도담</span>
                    ) : (
                      <DodamScrollText progress={scrollProgress} />
                    )}
                    <span className="white">에</span>
                  </S.HeroLine>
                )
              )}
            </S.HeroTitleBlock>

            <S.PhoneMockupHero
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.5, ease: "easeOut" }}
            >
              <img
                src={theme === "dark" ? imgMockupDark : imgMockupLight}
                alt="도담도담 앱 목업"
              />
            </S.PhoneMockupHero>
          </S.HeroInner>
        </S.HeroSticky>
      </S.HeroScrollArea>

      <S.BlueSection ref={blueRef}>
        <S.BlueInner>
          <S.BlueCopy>
            <S.BlueHeadline
              initial={{ opacity: 0, y: 20 }}
              animate={blueInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, ease: "easeOut" }}
            >
              <S.BlueHeadlineLine>DGSW 누구나</S.BlueHeadlineLine>
              <S.BlueHeadlineLine>어떤 아이디어든</S.BlueHeadlineLine>
              <S.BlueHeadlineLine>더 빠르게 서비스할 수 있도록</S.BlueHeadlineLine>
            </S.BlueHeadline>

            <S.BlueSubtitle
              initial={{ opacity: 0, y: 20 }}
              animate={blueInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.12, ease: "easeOut" }}
            >
              <S.BlueSubtitleLine>apps in 도담도담으로</S.BlueSubtitleLine>
              <S.BlueSubtitleLine>앱 배포 과정을 줄여</S.BlueSubtitleLine>
              <S.BlueSubtitleLine>당신의 아이디어 실현을 도울게요.</S.BlueSubtitleLine>
            </S.BlueSubtitle>
          </S.BlueCopy>

          <motion.div
            initial={{ opacity: 0 }}
            animate={blueInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <InfiniteMarquee />
          </motion.div>
        </S.BlueInner>
      </S.BlueSection>

      <S.FeaturesSection ref={featuresRef}>
        <S.FeaturesInner>
          <S.FeaturesStickyTitle
            initial={{ opacity: 0, x: -20 }}
            animate={featuresInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <S.FeaturesSectionTitle>
              <p>개발부터 테스트까지</p>
              <p>한순간에</p>
            </S.FeaturesSectionTitle>
          </S.FeaturesStickyTitle>

          <S.FeaturesList>
            {FEATURES.map((feat, i) => (
              <S.FeatureItem
                key={i}
                $reverse={!!feat.reverse}
                initial={{ opacity: 0, y: 28 }}
                animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.12, ease: "easeOut" }}
              >
                {feat.image ? (
                  <S.FeatureDdsImage
                    src={typeof feat.image === "string" ? feat.image : theme === "dark" ? feat.image.dark : feat.image.light}
                    alt=""
                  />
                ) : (
                  <S.FeatureImageBox />
                )}
                <S.FeatureText>
                  <S.FeatureTitle>
                    {feat.title.map((line, j) => <p key={j}>{line}</p>)}
                  </S.FeatureTitle>
                  <S.FeatureDesc>
                    {feat.desc.map((line, j) => <p key={j}>{line}</p>)}
                  </S.FeatureDesc>
                </S.FeatureText>
              </S.FeatureItem>
            ))}
          </S.FeaturesList>
        </S.FeaturesInner>
      </S.FeaturesSection>

      <S.GrowthSection ref={growthRef}>
        <S.GrowthInner>
          <S.GrowthHeader
            initial={{ opacity: 0, y: 20 }}
            animate={growthInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <S.GrowthTitle>
              <p>모든 학생이</p>
              <p>함께 성장할 수 있도록.</p>
            </S.GrowthTitle>
            <S.GrowthSubtitle>아이디어의 도약을 도울게요</S.GrowthSubtitle>
          </S.GrowthHeader>

          <S.GrowthCards>
            <motion.div
              style={{ flex: 1, display: "flex" }}
              initial={{ opacity: 0, y: 28 }}
              animate={growthInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            >
              <S.GrowthCard style={{ width: "100%" }}>
                <S.GrowthCardTitle>신규 서비스 홍보 알림</S.GrowthCardTitle>
                <S.PhoneMockup>
                  <S.MockupNotification>
                    <S.MockupAppIcon />
                    <S.MockupTextLines>
                      <S.MockupLine $width={80} />
                      <S.MockupLine $width={110} />
                    </S.MockupTextLines>
                  </S.MockupNotification>
                  <S.MockupNotification style={{ opacity: 0.5 }}>
                    <S.MockupAppIcon />
                    <S.MockupTextLines>
                      <S.MockupLine $width={60} />
                      <S.MockupLine $width={90} />
                    </S.MockupTextLines>
                  </S.MockupNotification>
                </S.PhoneMockup>
              </S.GrowthCard>
            </motion.div>

            <motion.div
              style={{ flex: 1, display: "flex" }}
              initial={{ opacity: 0, y: 28 }}
              animate={growthInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            >
              <S.GrowthCard style={{ width: "100%" }}>
                <S.GrowthCardTitle>서비스 평가 기능 지원</S.GrowthCardTitle>
                <S.StarRatingContent
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={growthInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.45, delay: 0.45, ease: "easeOut" }}
                >
                  <S.RatingNumber>4.8</S.RatingNumber>
                  <S.StarRow>
                    {[1, 2, 3, 4, 5].map((n) => <Star key={n} filled={n <= 4} />)}
                  </S.StarRow>
                </S.StarRatingContent>
              </S.GrowthCard>
            </motion.div>
          </S.GrowthCards>
        </S.GrowthInner>
      </S.GrowthSection>

      <FinalCTA />
    </S.Page>
  );
};

const CTAButton = () => {
  useGetMyInfoQuery();
  return (
    <Link to="/teams" style={{ textDecoration: "none" }}>
      <S.FinalCTAButton>
        팀 만들기
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </S.FinalCTAButton>
    </Link>
  );
};

const CTAButtonFallback = () => {
  const handleClick = () => {
    window.location.href = import.meta.env.VITE_LOGIN_URL!;
  };
  return (
    <S.FinalCTAButton onClick={handleClick}>
      팀 만들기
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    </S.FinalCTAButton>
  );
};

const FinalCTA = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <S.FinalCTASection ref={ref}>
      <S.FinalCTAInner>
        <S.FinalCTAEyebrow
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          지금 시작하기
        </S.FinalCTAEyebrow>

        <S.FinalCTATitle
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.08, ease: "easeOut" }}
        >
          <p>아이디어가 있다면,</p>
          <p><span>도담도담</span>이 날개를 달아줄게요.</p>
        </S.FinalCTATitle>

        <S.FinalCTADesc
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.16, ease: "easeOut" }}
        >
          팀을 만들고, 서비스를 등록하면{"\n"}
          복잡한 배포 과정 없이{"\n"}
          DGSW 모두에게 바로 선보일 수 있어요.
        </S.FinalCTADesc>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, delay: 0.26, ease: "easeOut" }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
        >
          <ErrorBoundary fallback={<CTAButtonFallback />}>
            <Suspense fallback={<CTAButtonFallback />}>
              <CTAButton />
            </Suspense>
          </ErrorBoundary>
        </motion.div>
      </S.FinalCTAInner>
    </S.FinalCTASection>
  );
};

export default Home;
