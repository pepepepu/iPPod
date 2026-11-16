import type { RefObject } from 'react';
import { BsChevronRight } from 'react-icons/bs';
import { homeContent } from '../../content/homeContent';
import * as S from './styles';

export interface ProjectsScreenProps {
  selectedIndex: number;
  listContainerRef: RefObject<HTMLUListElement | null>;
  onHoverIndex: (index: number) => void;
  onOpenProjectDetail: (index: number) => void;
}

export function ProjectsScreen({
  selectedIndex,
  listContainerRef,
  onHoverIndex,
  onOpenProjectDetail,
}: ProjectsScreenProps) {
  const activeProj =
    homeContent.projects[selectedIndex] || homeContent.projects[0];

  return (
    <S.SplitBody>
      <S.LeftPane>
        <S.MenuList ref={listContainerRef}>
          {homeContent.projects.map((proj, idx) => (
            <S.MenuItemRow
              key={proj.id}
              $active={idx === selectedIndex}
              onMouseEnter={() => onHoverIndex(idx)}
              onClick={() => onOpenProjectDetail(idx)}
            >
              <span className="truncate">
                {proj.trackNumber}. {proj.title}
              </span>
              <BsChevronRight size={14} />
            </S.MenuItemRow>
          ))}
        </S.MenuList>
      </S.LeftPane>

      <S.RightPane>
        <S.RightPaneInner>
          <S.Y2KGradientCover $gradient={activeProj.y2kGradient}>
            <S.AlbumOpticalRing />
            <S.ArtworkBadge>{activeProj.discCode}</S.ArtworkBadge>
          </S.Y2KGradientCover>
          <S.PreviewTitle>{activeProj.title}</S.PreviewTitle>
          <S.PreviewSubtitle>{activeProj.contextLabel}</S.PreviewSubtitle>
          <S.TagRow>
            {activeProj.tags.slice(0, 4).map((tech) => (
              <S.MiniTag key={tech}>{tech}</S.MiniTag>
            ))}
          </S.TagRow>
        </S.RightPaneInner>
      </S.RightPane>
    </S.SplitBody>
  );
}