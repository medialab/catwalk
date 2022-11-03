import {useEffect} from 'react';

import cache from '../cache';
import {inferAnnotationStatsFromConfigAndRows} from '../model';
import {useSetBoxedAtom} from './utils';
import {useSetView} from './ui-state';
import {dataAtom, annotationConfigAtom, annotationStatsAtom} from '../atoms'; // TODO: argsort from cache

export function useLoadCacheEffect() {
  const setView = useSetView();
  const setData = useSetBoxedAtom(dataAtom);
  const setAnnotationConfig = useSetBoxedAtom(annotationConfigAtom);
  const setAnnotationStats = useSetBoxedAtom(annotationStatsAtom);

  useEffect(() => {
    const loadCache = async () => {
      const isValid = await cache.openAndValidateOrDelete();

      if (isValid) {
        const rows = await cache.getRows();
        const config = await cache.getConfig();
        const consistencyInfo = await cache.getConsistencyInfo();

        if (!config || !consistencyInfo)
          throw new Error(
            'inconsistency issue: config/consistencyInfo should be valid at this point!'
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

export function useAddRowsToCache() {
  return cache.addRows.bind(cache);
}
