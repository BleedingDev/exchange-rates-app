import { useRef, useEffect } from "react";

function detectChanged<T>(dependencies: T[], previousDeps: T[]): number[] {
  return dependencies.reduce((accum, dependency, index) => {
    if (dependency !== previousDeps[index]) {
      return [...accum, index];
    }

    return accum;
  }, [] as number[]);
}

function usePrevious<T>(value: T, initialValue: T) {
  const ref = useRef(initialValue);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export function useSmartEffect(
  depWithCb: {
    dependency: unknown;
    callback: () => void;
  }[]
) {
  const deps = depWithCb.map((dep) => dep.dependency);
  const prevDeps = usePrevious(deps, []);
  const changedDeps = detectChanged(deps, prevDeps).map(
    (changed) => depWithCb[changed]
  );
  useEffect(() => {
    changedDeps.forEach((dep) => dep.callback());
  }, [changedDeps]);
}
