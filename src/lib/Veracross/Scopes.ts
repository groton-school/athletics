import * as Veracross from '@groton/veracross-api';

export const SCOPES = [
  Veracross.Data.Athletics.Coaches.LIST_SCOPE,
  Veracross.Data.Athletics.Teams.READ_SCOPE,
  Veracross.Data.Events.Athletics.LIST_SCOPE,
  Veracross.Data.Events.AthleticsOpponents.LIST_SCOPE,
  Veracross.Data.Events.AthleticsScores.UPDATE_SCOPE
];
