import React from "react";
import isEqual from "lodash/isEqual";

// TODO: this function is a hack and probably should be replaced with e.g. useReducer or React Query
// NOTE: also, using this function prevents the use of e.g. the exhaustive-deps rule/check
export function useEffectWithoutReruns(fn: () => any, dependencies: any[]) {
  const previousTrigger = React.useRef<typeof dependencies | null>(null);

  React.useEffect(() => {
    if (isEqual(dependencies, previousTrigger.current)) return;
    previousTrigger.current = [...dependencies];

    return fn();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
}
