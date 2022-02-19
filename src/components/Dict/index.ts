import { withInstall } from '/@/utils';
import dictLabel from './src/components/DictLabel.vue';

export * from './src/hooks/useDict';
export const DictLabel = withInstall(dictLabel);
