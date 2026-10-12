import type { Veracross } from '@/lib/Veracross';

export type Properties = {
  event: Veracross.Data.Events.Athletics.Athletic & {
    opponents: Veracross.Data.Events.AthleticsOpponents.AthleticsOpponentCollection;
  };
};
