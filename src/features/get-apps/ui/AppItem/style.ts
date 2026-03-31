import type { ReleaseStatus } from "@/entities/apps/types";
import { getStatus } from "@/features/get-apps/utils/get-status";
import { shapes, typoCss } from "@b1nd/dodam-design-system";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

export const Container = styled(Link)`
  width: 100%;
  padding: 8px 10px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const Logo = styled.img`
  width: 64px;
  height: 64px;
  border-radius: ${shapes.medium};
`;

export const Name = styled.p`
  ${typoCss("Heading2", "Medium")};
`;

export const Status = styled.p<{
  $releaseEnabled: boolean;
  $releaseStatus: ReleaseStatus;
}>`
  ${typoCss("Body1", "Bold")};
  color: ${({ $releaseEnabled, $releaseStatus }) =>
    getStatus($releaseEnabled, $releaseStatus)?.color};
`;
