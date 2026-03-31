import { motion, useInView, useAnimationFrame } from "framer-motion";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import * as S from "./style";
import DodamLogo from "../../shared/assets/images/AppIcon.png";

const imgPhone1 =
  "https://www.figma.com/api/mcp/asset/6a16a281-0205-4a54-bddf-93de1711e5e8";
const imgPhone2 =
  "https://www.figma.com/api/mcp/asset/9d95a750-2151-4da8-b0a5-1d3411b3cb5d";

/* ─── 서비스 태그 ─────────────────────────────────────── */
const SERVICE_TAGS = [
  "기숙사 출석체크", "포트폴리오 아카이브", "오늘의 급식 평가하기",
  "대소위키", "축구할 사람 모으기", "선생님 심부름 도와드리기",
  "대나무숲", "나만의 웹툰 연재하기", "내 깃허브 순위 보기",
  "실습동 출석체크", "내 CS 지식 수준 확인하기", "대소고 프로젝트 아카이브",
  "학교 축제 부스 운영하기", "오늘의 익명 일기장", "대소고 기술 블로그",
  "교내 분실물 찾아주기", "프로젝트 팀원 찾기", "대소고 포토북",
];

const ROW1 = SERVICE_TAGS.slice(0, 9);
const ROW2 = SERVICE_TAGS.slice(9);

const MarqueeRow = ({ tags, reverse }: { tags: string[]; reverse?: boolean }) => {
  const [x, setX] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  useAnimationFrame((_, delta) => {
    setX((prev) => {
      const trackWidth = trackRef.current?.scrollWidth ?? 2000;
      const half = trackWidth / 2;
      const speed = (delta / 1000) * 55;
      if (reverse) {
        const next = prev + speed;
        return next >= 0 ? -half : next;
      }
      const next = prev - speed;
      return next <= -half ? 0 : next;
    });
  });

  return (
    <S.MarqueeTrack ref={trackRef} style={{ transform: `translateX(${x}px)` }}>
      {[...tags, ...tags].map((tag, i) => (
        <S.ServiceTag key={i}><p>{tag}</p></S.ServiceTag>
      ))}
    </S.MarqueeTrack>
  );
};

const InfiniteMarquee = () => (
  <S.MarqueeWrapper>
    <MarqueeRow tags={ROW1} />
    <MarqueeRow tags={ROW2} reverse />
  </S.MarqueeWrapper>
);

/* ─── Star ───────────────────────────────────────────── */
const Star = ({ filled }: { filled?: boolean }) => (
  <S.StarSvg $filled={filled}>
    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  </S.StarSvg>
);

/* ─── Features 데이터 ─────────────────────────────────── */
const FEATURES = [
  {
    title: ["도담도담", "디자인 시스템과 함께"],
    desc: ["DDS ( 도담도담 디자인 시스템 ) 를 통해", "따로 디자인 시스템을 구축하지 않고, 개발이 가능해요."],
    image: DodamLogo,
  },
  {
    title: ["앱 업데이트 없이", "내 서비스 바로 등록 가능"],
    desc: ["내가 등록한 서비스는", "도담도담을 업데이트하지 않아도 작동해요."],
  },
  {
    title: ["내 프로토타입을", "테스트하는 공간"],
    desc: ["어떤 서비스도 괜찮아요!", "당신의 프로토타입 테스트를 도와드릴게요."],
  },
];

/* ─── Home ───────────────────────────────────────────── */
const Home = () => {
  const blueRef = useRef(null);
  const featuresRef = useRef(null);
  const growthRef = useRef(null);

  const blueInView = useInView(blueRef, { once: true, margin: "-60px" });
  const featuresInView = useInView(featuresRef, { once: true, margin: "-60px" });
  const growthInView = useInView(growthRef, { once: true, margin: "-60px" });

  return (
    <S.Page>

      {/* ── 1. Hero ── */}
      <S.HeroSection>
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
                  <span className="blue">도담도담</span>
                  <span className="white">에</span>
                </S.HeroLine>
              )
            )}
          </S.HeroTitleBlock>

          <S.Phone1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.5, ease: "easeOut" }}
          >
            <div style={{ transform: "rotate(8.24deg)" }}>
              <img src={imgPhone1} alt="" width={384} height={326} style={{ display: "block", maxWidth: "100%" }} />
            </div>
          </S.Phone1>

          <S.Phone2
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.65, ease: "easeOut" }}
          >
            <div style={{ transform: "rotate(-19.4deg)" }}>
              <img src={imgPhone2} alt="" width={326} height={320} style={{ display: "block", maxWidth: "100%" }} />
            </div>
          </S.Phone2>
        </S.HeroInner>
      </S.HeroSection>

      {/* ── 2. Blue ── */}
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

      {/* ── 3. Features ── */}
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
                initial={{ opacity: 0, y: 28 }}
                animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.12, ease: "easeOut" }}
              >
                <S.FeatureImageBox>
                  {feat.image && <img src={feat.image} alt="" style={{ width: "60%", objectFit: "contain" }} />}
                </S.FeatureImageBox>
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

      {/* ── 4. Growth ── */}
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

      {/* ── 5. Final CTA ── */}
      <FinalCTA />

    </S.Page>
  );
};

/* ─── Final CTA ──────────────────────────────────────── */
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
          팀을 만들고, 서비스를 등록하고,{"\n"}
          DGSW 전교생에게 바로 선보이세요.{"\n"}
          앱 심사도, 업데이트도 필요 없어요.
        </S.FinalCTADesc>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, delay: 0.26, ease: "easeOut" }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
        >
          <Link to="/teams" style={{ textDecoration: "none" }}>
            <S.FinalCTAButton>
              팀 만들기
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </S.FinalCTAButton>
          </Link>
        </motion.div>
      </S.FinalCTAInner>
    </S.FinalCTASection>
  );
};

export default Home;
