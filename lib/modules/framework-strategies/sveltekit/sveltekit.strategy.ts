import { FrameworkStrategy } from "../types";
import { DynamicOptionalArgStrategy } from "./args-strategies/dynamic-optional.strategy";
import { DynamicRequiredArgStrategy } from "./args-strategies/dynamic-required.strategy";
import { DynamicRestArgStrategy } from "./args-strategies/dynamic-rest.strategy";
import { GroupArgStrategy } from "./args-strategies/group.strategy";
import { StaticArgStrategy } from "./args-strategies/static.strategy";

export const SVELTEKIT_STRATEGY: FrameworkStrategy = {
  argStrategies: [
    new GroupArgStrategy(),
    new DynamicRestArgStrategy(),
    new DynamicOptionalArgStrategy(),
    new DynamicRequiredArgStrategy(),
  ],
  defaultArgStrategy: new StaticArgStrategy(),
};
