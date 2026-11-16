import type { RefObject } from 'react';
import { BsChevronRight } from 'react-icons/bs';
import { homeContent } from '../../content/homeContent';
import * as S from './styles';

export interface AboutScreenProps {
  selectedIndex: number;
  listContainerRef: RefObject<HTMLUListElement | null>;
  onHoverIndex: (index: number) => void;
}

export function AboutScreen({
  selectedIndex,
  listContainerRef,
  onHoverIndex,
}: AboutScreenProps) {
  const activeBioTrack =
    homeContent.about.tracks[selectedIndex] || homeContent.about.tracks[0];

  return (
    <S.SplitBody>
      <S.LeftPane>
        <S.MenuList ref={listContainerRef}>
          {homeContent.about.tracks.map((item, idx) => (
            <S.MenuItemRow
              key={item.id}
              $active={idx === selectedIndex}
              onMouseEnter={() => onHoverIndex(idx)}
              onClick={() => onHoverIndex(idx)}
            >
              <span className="truncate">{item.label}</span>
              <BsChevronRight size={14} />
            </S.MenuItemRow>
          ))}
        </S.MenuList>
      </S.LeftPane>

      <S.RightPane>
        <S.RightPaneInner>
          <S.Y2KGradientCover
            $gradient={homeContent.about.y2kGradient}
            $size={94}
          >
            <S.AlbumOpticalRing />
            <S.ArtworkBadge>{activeBioTrack.tag}</S.ArtworkBadge>
          </S.Y2KGradientCover>
          <S.PreviewTitle>{homeContent.about.title}</S.PreviewTitle>
          <S.PreviewSubtitle>{homeContent.about.subtitle}</S.PreviewSubtitle>
          <S.InfoTextCard>
            <span className="label">{activeBioTrack.label}</span>
            <p className="val">{activeBioTrack.content}</p>
          </S.InfoTextCard>
        </S.RightPaneInner>
      </S.RightPane>
    </S.SplitBody>
  );
}