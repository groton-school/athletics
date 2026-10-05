'use server';

import { Veracross } from '#lib/Veracross';
import z from 'zod';
import { zfd } from 'zod-form-data';

const schema = zfd
  .formData({
    game_outcome_id: zfd.numeric(z.int().gte(0).lte(5).optional()),
    game_score_us: zfd.numeric(z.number().gte(0).optional()),
    game_score_opponent: zfd.numeric(z.number().gte(0).optional()),
    placement_id: zfd.numeric(z.int().gte(0).lte(51).optional()),
    overtime: zfd.checkbox().optional(),
    summary: zfd.text(z.string().max(1500).optional())
  })
  .transform((obj) =>
    Object.fromEntries(
      Object.entries(obj).filter(([_, value]) => value !== undefined)
    )
  );

export async function updateAthleticScore(
  event_id: number,
  state: unknown,
  data: z.input<typeof schema>
) {
  console.log({ event_id, state, data });
  const validate = schema.safeParse(data);
  console.log({ validate });
  if (validate.success) {
    try {
      await Veracross.Data.Events.AthleticsScores.update({
        id: event_id,
        data: validate.data
      });
      return { success: true };
    } catch (error) {
      return { error };
    }
  }
  return {
    ...z.treeifyError(validate.error),
    data
  };
}
