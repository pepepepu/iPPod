import {
  homeContent,
  type IPPodColorPreset,
} from '../../content/homeContent';
import * as S from './styles';

export interface ColorPickerProps {
  activeColorId: string;
  onSelectColor: (preset: IPPodColorPreset) => void;
}

export function ColorPicker({
  activeColorId,
  onSelectColor,
}: ColorPickerProps) {
  return (
    <S.BottomRightPanel>
      <S.ColorPickerCard>
        <S.ColorPickerLabel>COR:</S.ColorPickerLabel>
        <S.SwatchList>
          {homeContent.colorPresets.map((preset) => (
            <S.ColorSwatchButton
              key={preset.id}
              type="button"
              title={preset.name}
              $hex={preset.swatchHex}
              $active={preset.id === activeColorId}
              onClick={() => onSelectColor(preset)}
            />
          ))}
        </S.SwatchList>
      </S.ColorPickerCard>
    </S.BottomRightPanel>
  );
}