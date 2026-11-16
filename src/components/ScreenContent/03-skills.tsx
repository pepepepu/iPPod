import type { RefObject } from 'react';
import { BsChevronRight } from 'react-icons/bs';
import { homeContent } from '../../content/homeContent';
import * as S from './styles';

export interface SkillsScreenProps {
  selectedIndex: number;
  listContainerRef: RefObject<HTMLUListElement | null>;
  onHoverIndex: (index: number) => void;
}

export function SkillsScreen({
  selectedIndex,
  listContainerRef,
  onHoverIndex,
}: SkillsScreenProps) {
  const activeTopic =
    homeContent.whatIDo.topics[selectedIndex] ||
    homeContent.whatIDo.topics[0];

  return (
    <S.SplitBody>
      <S.LeftPane>
        <S.MenuList ref={listContainerRef}>
          {homeContent.whatIDo.topics.map((topic, idx) => (
            <S.MenuItemRow
              key={topic.id}
              $active={idx === selectedIndex}
              onMouseEnter={() => onHoverIndex(idx)}
              onClick={() => onHoverIndex(idx)}
            >
              <span className="truncate">{topic.label}</span>
              <BsChevronRight size={14} />
            </S.MenuItemRow>
          ))}
        </S.MenuList>
      </S.LeftPane>

      <S.RightPane>
        <S.RightPaneInner>
          <S.EqualizerBox>
            {activeTopic.bars.map((barValue, idx) => (
              <S.EqBarColumn key={`${activeTopic.id}-${idx}`}>
                <S.EqBarFill $height={barValue} />
              </S.EqBarColumn>
            ))}
          </S.EqualizerBox>
          <S.PreviewTitle>{activeTopic.label}</S.PreviewTitle>
          <S.PreviewSubtitle>{activeTopic.tools}</S.PreviewSubtitle>
          <S.InfoTextCard>
            <span className="label">{activeTopic.subtitle}</span>
            <p className="val">{activeTopic.description}</p>
          </S.InfoTextCard>
        </S.RightPaneInner>
      </S.RightPane>
    </S.SplitBody>
  );
}