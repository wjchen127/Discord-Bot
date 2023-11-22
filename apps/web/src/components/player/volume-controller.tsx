import {
  SpeakerLoudIcon,
  SpeakerModerateIcon,
  SpeakerOffIcon,
  SpeakerQuietIcon,
} from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';
import { Slider } from '../ui/slider';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

export function VolumeController({
  volume,
  onChange,
}: {
  volume: number;
  onChange: (volume: number) => void;
}) {
  const [currentValue, setCurrentValue] = useState(volume);

  const icon =
    currentValue === 0 ? (
      <SpeakerOffIcon className="h-5 w-5" />
    ) : currentValue > 0 && currentValue <= 10 ? (
      <SpeakerQuietIcon className="h-5 w-5" />
    ) : currentValue > 10 && currentValue < 50 ? (
      <SpeakerModerateIcon className="h-5 w-5" />
    ) : currentValue >= 50 ? (
      <SpeakerLoudIcon className="h-5 w-5" />
    ) : null;

  useEffect(() => {
    setCurrentValue(volume);
  }, [volume]);

  return (
    <>
      {icon}
      <Slider
        onValueChange={(e) => {
          // maybe bug, valueCommit does not fire if we do not handle valueChange for some reason...
          setCurrentValue(e[0]);
        }}
        onValueCommit={(e) => {
          setCurrentValue(e[0]);
          onChange(e[0]);
        }}
        value={[currentValue]}
        max={100}
        min={0}
        step={1}
      />
    </>
  );
}
