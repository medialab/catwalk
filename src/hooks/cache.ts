import {useEffect} from 'react';

import cache from '../cache';
import {inferAnnotationStatsFromConfigAndRows} from '../model';
import {useSetBoxedAtom} from './utils';
import {useSetView} from './ui-state';
import {dataAtom, annotationConfigAtom, annotationStatsAtom} from '../atoms'; // TODO: argsort from cache

/* eslint-disable react-hooks/exhaustive-deps */
export function useLoadCacheEffect() {
  const setView = useSetView();
  const setData = useSetBoxedAtom(dataAtom);
  const setAnnotationConfig = useSetBoxedAtom(annotationConfigAtom);
  const setAnnotationStats = useSetBoxedAtom(annotationStatsAtom);

  useEffect(() => {
    const loadCache = async () => {
      if (cache.isOpen())
        throw new Error(
          'useLoadCacheEffect: we do not yet deal with the case when we go back to landing. Maybe we should use this in splash view instead?'
        );

      const isValid = await cache.openAndValidateOrDelete();

      if (isValid) {
        const rows = await cache.getRows();
        const config = await cache.getConfig();
        const consistencyInfo = await cache.getConsistencyInfo();

        if (!config || !consistencyInfo)
          throw new Error(
            'useLoadCacheEffect inconsistency issue: config/consistencyInfo should be valid at this point!'
          );

        const stats = inferAnnotationStatsFromConfigAndRows(config, rows);

        setData({rows, columns: consistencyInfo.columns});
        setAnnotationConfig(config);
        setAnnotationStats(stats);
        setView('annotation');
      } else {
        setView('landing');
      }
    };

    loadCache();
  }, []);
}
/* eslint-enable react-hooks/exhaustive-deps */

export function useAddRowsToCache() {
  return cache.addRows.bind(cache);
}
