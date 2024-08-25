import { ArgStrategy, FrameworkStrategy } from '../types';
import { DynamicOptionalArgStrategy } from './args-strategies/dynamic-optional.strategy';
import { DynamicRequiredArgStrategy } from './args-strategies/dynamic-required.strategy';
import { DynamicRestArgStrategy } from './args-strategies/dynamic-rest.strategy';
import { GroupArgStrategy } from './args-strategies/group.strategy';
import { StaticArgStrategy } from './args-strategies/static.strategy';

export class SveltekitStrategy implements FrameworkStrategy {
  readonly argStrategies: ArgStrategy[];
  readonly defaultArgStrategy: ArgStrategy;

  constructor() {
    this.argStrategies = [
      new GroupArgStrategy(),
      new DynamicRestArgStrategy(),
      new DynamicOptionalArgStrategy(),
      new DynamicRequiredArgStrategy(),
    ];
    this.defaultArgStrategy = new StaticArgStrategy();
  }
}
