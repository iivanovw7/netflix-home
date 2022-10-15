import getLogger, { logLevelMap, setLogLevel } from './logger';

setLogLevel(logLevelMap.SILENT);

export default getLogger;
export { setLogLevel, logLevelMap };
