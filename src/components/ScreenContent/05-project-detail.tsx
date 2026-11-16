import { BsChevronRight, BsLink45Deg } from 'react-icons/bs';
import {
  getProjectDetailActions,
  homeContent,
} from '../../content/homeContent';
import * as S from './styles';

export interface ProjectDetailScreenProps {
  activeProjectIndex: number;
  selectedIndex: number;
  statusFeedback: string | null;
  onHoverIndex: (index: number) => void;
  onExecuteProjectAction: (actionIdx: number) => void;
}

export function ProjectDetailScreen({
  activeProjectIndex,
  selectedIndex,
  statusFeedback,
  onHoverIndex,
  onExecuteProjectAction,
}: ProjectDetailScreenProps) {
  const proj =
    homeContent.projects[activeProjectIndex] || homeContent.projects[0];
  const actions = getProjectDetailActions(proj);

  return (
    <S.FullScreenBody>
      <div>
        <S.DetailHeader>
          <S.DetailMiniCover $gradient={proj.y2kGradient}>
            {proj.trackNumber}
          </S.DetailMiniCover>
          <S.DetailTitleBlock>
            <h3>{proj.title}</h3>
            <span>
              {proj.contextLabel}
              {statusFeedback ? ` • ${statusFeedback}` : ''}
            </span>
            <S.TagRow style={{ justifyContent: 'flex-start' }}>
              {proj.tags.map((t) => (
                <S.MiniTag key={t}>{t}</S.MiniTag>
              ))}
            </S.TagRow>
          </S.DetailTitleBlock>
        </S.DetailHeader>

        <S.DetailDescription>{proj.description}</S.DetailDescription>

        <S.ActionButtonsList>
          {actions.map((act, idx) => (
            <S.MenuItemRow
              key={act.label}
              $active={idx === selectedIndex}
              onMouseEnter={() => onHoverIndex(idx)}
              onClick={() => {
                onHoverIndex(idx);
                onExecuteProjectAction(idx);
              }}
            >
              <span className="truncate">{act.label}</span>
              {act.type === 'back' ? (
                <BsChevronRight size={14} />
              ) : (
                <BsLink45Deg size={18} />
              )}
            </S.MenuItemRow>
          ))}
        </S.ActionButtonsList>
      </div>
    </S.FullScreenBody>
  );
}