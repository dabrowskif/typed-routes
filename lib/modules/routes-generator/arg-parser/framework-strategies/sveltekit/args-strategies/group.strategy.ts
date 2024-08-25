import { type Arg, ArgStrategy } from '../../types';

export class GroupArgStrategy implements ArgStrategy {
  readonly name = GroupArgStrategy.name;
  private readonly matchRegexp = /^\(\w+\)$/;

  isMatching(fileName: string) {
    return this.matchRegexp.test(fileName);
  }

  extractArg(_fileName: string): Arg {
    // INFO: no logic here as sveltekit group arg has no impact on route
    return {
      isDynamic: false,
      name: '',
    };
  }

  getPathSegment(_arg: Arg) {
    return '';
  }
}
