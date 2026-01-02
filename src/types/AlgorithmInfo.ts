export type Complexity = {
  best: string;
  average: string;
  worst: string;
  space: string;
};

export type AlgorithmInfo = {
  id: string;
  name: string;
  description: string;
  complexity: Complexity;
  implementations: {
    // javascript?: string;
    typescript?: string;
    // java?: string;
    // python?: string;
    // c?: string;
    // cpp?: string;
  };
};
