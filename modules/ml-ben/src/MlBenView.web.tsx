import * as React from 'react';

import { MlBenViewProps } from './MlBen.types';

export default function MlBenView(props: MlBenViewProps) {
  return (
    <div>
      <span>{props.name}</span>
    </div>
  );
}
