import { getLogger, logLevelMap, setLogLevel } from './logger';

setLogLevel(logLevelMap.SILENT);

export { getLogger, setLogLevel, logLevelMap };
