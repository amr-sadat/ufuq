/**
 * One scenario the AI pipeline is graded against. Evaluation cases live here
 * so they can be versioned alongside the schema they validate.
 */
export interface EvaluationCase<TInput = unknown, TExpected = unknown> {
  readonly id: string;
  readonly description: string;
  readonly input: TInput;
  readonly expected: TExpected;
}
