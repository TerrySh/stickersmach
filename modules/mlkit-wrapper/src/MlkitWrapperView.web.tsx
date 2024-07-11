import * as React from 'react';

import { MlkitWrapperViewProps } from './MlkitWrapper.types';

export default function MlkitWrapperView(props: MlkitWrapperViewProps) {
  return (
    <div>
      <span>{props.name}</span>
    </div>
  );
}
