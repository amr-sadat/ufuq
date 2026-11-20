import type { EvaluationCase } from './evaluation-case';

describe('EvaluationCase', () => {
  it('holds a typed case for the regression runner', () => {
    const evaluationCase: EvaluationCase<
      { documentId: string },
      { grounded: boolean }
    > = {
      id: 'grounded-timeline',
      description: 'Every section cites a source page',
      input: { documentId: 'doc-1' },
      expected: { grounded: true },
    };

    expect(evaluationCase.input.documentId).toBe('doc-1');
    expect(evaluationCase.expected.grounded).toBe(true);
  });
});
