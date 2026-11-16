import type { RefObject } from 'react';
import { BsLink45Deg } from 'react-icons/bs';
import { homeContent } from '../../content/homeContent';
import * as S from './styles';

export interface ContactScreenProps {
  selectedIndex: number;
  listContainerRef: RefObject<HTMLUListElement | null>;
  onHoverIndex: (index: number) => void;
}

export function ContactScreen({
  selectedIndex,
  listContainerRef,
  onHoverIndex,
}: ContactScreenProps) {
  const activeContact =
    homeContent.contact.links[selectedIndex] || homeContent.contact.links[0];

  return (
    <S.SplitBody>
      <S.LeftPane>
        <S.MenuList ref={listContainerRef}>
          {homeContent.contact.links.map((cnt, idx) => (
            <S.MenuItemRow
              key={cnt.id}
              $active={idx === selectedIndex}
              onMouseEnter={() => onHoverIndex(idx)}
              onClick={() => {
                onHoverIndex(idx);
                window.open(cnt.url, '_blank', 'noopener,noreferrer');
              }}
            >
              <span className="truncate">{cnt.label}</span>
              <BsLink45Deg size={18} />
            </S.MenuItemRow>
          ))}
        </S.MenuList>
      </S.LeftPane>

      <S.RightPane>
        <S.RightPaneInner>
          <S.Y2KGradientCover $gradient={activeContact.y2kGradient} $size={96}>
            <S.AlbumOpticalRing />
            <S.ArtworkBadge>{activeContact.protocol}</S.ArtworkBadge>
          </S.Y2KGradientCover>
          <S.PreviewTitle>{activeContact.label}</S.PreviewTitle>
          <S.PreviewSubtitle>{activeContact.value}</S.PreviewSubtitle>
          <S.InfoTextCard>
            <span className="label">{homeContent.contact.subtitle}</span>
            <p className="val">{homeContent.contact.message}</p>
          </S.InfoTextCard>
        </S.RightPaneInner>
      </S.RightPane>
    </S.SplitBody>
  );
}