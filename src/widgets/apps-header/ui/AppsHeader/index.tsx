import { colors, FilledButton, Plus } from "@b1nd/dodam-design-system";
import { AnimatePresence, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import * as S from "./style";
import { useNavigate } from "react-router-dom";

const MotionPopup = motion.create(S.PopupContainer);

interface Props {
  title: string;
  showCta?: boolean;
}

const AppsHeader = ({ title, showCta = false }: Props) => {
  const { ref, inView } = useInView({ initialInView: true });
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/apps/register");
  };

  return (
    <>
      <S.Container ref={ref}>
        <h2>{title}</h2>
        {showCta && (
          <FilledButton size="medium" onClick={handleClick}>
            <Plus size={18} color={colors.text.primary} />
            <p style={{ marginLeft: 4 }}>애플리케이션 등록하기</p>
          </FilledButton>
        )}
      </S.Container>
      <AnimatePresence>
        {showCta && !inView && (
          <MotionPopup
            initial={{ opacity: 0, y: 24, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 24, x: "-50%" }}
            transition={{ duration: 0.25, ease: "easeOut" }}>
            <h2>솟아오르는 아이디어들을 지금 바로 구현하고 테스트해 보세요!</h2>
            <FilledButton size="medium" onClick={handleClick}>
              <Plus size={18} color={colors.text.primary} />
              <p style={{ marginLeft: 4 }}>애플리케이션 등록하기</p>
            </FilledButton>
          </MotionPopup>
        )}
      </AnimatePresence>
    </>
  );
};

export default AppsHeader;
