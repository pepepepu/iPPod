import * as S from './styles';

export interface StatusHeaderProps {
  isDeviceActive: boolean;
  colorName: string;
}

export function StatusHeader({ isDeviceActive, colorName }: StatusHeaderProps) {
  return (
    <S.TopHeaderBadge>
      <S.StatusDot $isOn={isDeviceActive} />
      <span>
        iPPod • {colorName.toUpperCase()} •{' '}
        {isDeviceActive ? 'ONLINE' : 'OFFLINE • CLIQUE EM [P] PARA LIGAR'}{' '}
      </span>
    </S.TopHeaderBadge>
  );
}