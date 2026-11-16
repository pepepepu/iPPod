import type { RefObject } from 'react';
import { BsChevronRight } from 'react-icons/bs';
import { homeContent } from '../../content/homeContent';
import * as S from './styles';

export interface HomeScreenProps {
  selectedIndex: number;
  listContainerRef: RefObject<HTMLUListElement | null>;
  onHoverIndex: (index: number) => void;
  onNavigateScreen: (screenId: 'about' | 'skills' | 'projects' | 'now-playing' | 'contact', index?: number) => void;
}

export function HomeScreen({
  selectedIndex,
  listContainerRef,
  onHoverIndex,
  onNavigateScreen,
}: HomeScreenProps) {
  const activeMenu = homeContent.mainMenu[selectedIndex] || homeContent.mainMenu[0];

  return (
    <S.SplitBody>
      <S.LeftPane>
        <S.MenuList ref={listContainerRef}>
          {homeContent.mainMenu.map((item, idx) => (
            <S.MenuItemRow
              key={item.id}
              $active={idx === selectedIndex}
              onMouseEnter={() => onHoverIndex(idx)}
              onClick={() => onNavigateScreen(item.id, 0)}
            >
              <span className="truncate">{item.label}</span>
              <BsChevronRight size={14} />
            </S.MenuItemRow>
          ))}
        </S.MenuList>
      </S.LeftPane>

      <S.RightPane>
        <S.RightPaneInner>
          <S.Y2KGradientCover $gradient={activeMenu.y2kGradient}>
            <S.AlbumOpticalRing />
            <S.ArtworkBadge>{activeMenu.badge}</S.ArtworkBadge>
          </S.Y2KGradientCover>
          <S.PreviewTitle>{activeMenu.previewTitle}</S.PreviewTitle>
          <S.PreviewSubtitle>{activeMenu.previewSubtitle}</S.PreviewSubtitle>
        </S.RightPaneInner>
      </S.RightPane>
    </S.SplitBody>
  );
}