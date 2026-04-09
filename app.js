/**
 * data.js
 * Language definitions and quiz bank for the Pumping Lemma Visualizer.
 */

'use strict';

/* =============================================
   LANGUAGE DEFINITIONS
   Each entry defines a formal language with:
   - name:    Display name
   - regular: true | false | null (custom)
   - defStr:  Default example string
   - defP:    Default pumping length
   - check:   Membership function (string → bool | null)
   - why:     Explanation of why pumping fails (non-regular only)
   - xd/yd/zd: Descriptions of x, y, z segments
   ============================================= */
const LANGS = {
  anbn: {
    name: 'L = { aⁿbⁿ | n ≥ 1 }',
    regular: false,
    defStr: 'aaabbb',
    defP: 3,
    check: s => {
      const h = s.length / 2;
      return Number.isInteger(h) && h > 0
        && /^a+$/.test(s.slice(0, h))
        && /^b+$/.test(s.slice(h));
    },
    why: "Since |xy| ≤ p, y lies entirely within the initial block of a's. Pumping y (i ≠ 1) gives a string with a different number of a's than b's — not in L. Contradiction.",
    xd: "x is a (possibly empty) prefix of a's.",
    yd: "y is a non-empty block of a's (constrained within the first p characters).",
    zd: "z contains the remaining a's and all the b's."
  },

  an: {
    name: 'L = { aⁿ | n ≥ 0 }',
    regular: true,
    defStr: 'aaaa',
    defP: 2,
    check: s => /^a*$/.test(s),
    why: null,
    xd: "x is a prefix of a's.",
    yd: "y is a block of a's — pumping gives more a's, which remain in L.",
    zd: "z is the remaining a's."
  },

  ww: {
    name: 'L = { ww | w ∈ {a,b}* }',
    regular: false,
    defStr: 'abab',
    defP: 2,
    check: s => s.length % 2 === 0 && s.slice(0, s.length / 2) === s.slice(s.length / 2),
    why: "Any split with |xy| ≤ p has y inside the first half. Pumping shifts the boundary between the two copies of w — breaking the duplication property.",
    xd: "x is a prefix of the first copy of w.",
    yd: "y lies within the first copy of w (since |xy| ≤ p).",
    zd: "z is the rest of w and the full second copy of w."
  },

  abn: {
    name: 'L = { (ab)ⁿ | n ≥ 1 }',
    regular: true,
    defStr: 'ababab',
    defP: 2,
    check: s => /^(ab)+$/.test(s),
    why: null,
    xd: "x is a (possibly empty) prefix following the (ab) pattern.",
    yd: "y is a chunk of (ab) repetitions; pumping maintains the alternation.",
    zd: "z completes the remaining (ab) pairs."
  },

  a2n: {
    name: 'L = { a²ⁿ | n ≥ 1 }',
    regular: true,
    defStr: 'aaaaaa',
    defP: 2,
    check: s => /^a+$/.test(s) && s.length % 2 === 0 && s.length >= 2,
    why: null,
    xd: "x is an even-length prefix of a's.",
    yd: "y has even length — pumping keeps the total length even.",
    zd: "z is the remaining even-length suffix of a's."
  },

  custom: {
    name: 'Custom',
    regular: null,
    defStr: '',
    defP: 3,
    check: () => null,
    why: "Custom language — membership is not automatically verified.",
    xd: "x is the prefix before the pumpable segment.",
    yd: "y is the chosen pumpable segment.",
    zd: "z is the suffix after y."
  }
};


/* =============================================
   QUIZ BANK
   Each item: question string, correct answer (bool), explanation
   ============================================= */
const QUIZ = [
  {
    q: 'Is L = { 0ⁿ1ⁿ | n ≥ 0 } regular?',
    a: false,
    exp: 'No. y lies only in the 0-block. Pumping produces unequal counts of 0s and 1s — a contradiction.'
  },
  {
    q: "Is L = { a* } (all strings of a's) regular?",
    a: true,
    exp: "Yes. A single-state DFA accepts it. Pumping any y gives more a's — still in L."
  },
  {
    q: 'Is L = { ww | w ∈ {0,1}* } regular?',
    a: false,
    exp: 'No. The self-duplication constraint cannot be enforced with finite memory. The pumping argument breaks the symmetry.'
  },
  {
    q: 'Is L = { (01)ⁿ | n ≥ 1 } regular?',
    a: true,
    exp: 'Yes. A 2-state DFA alternates between 0 and 1 expectations. The pumping lemma holds with p = 2.'
  },
  {
    q: 'Is L = { aⁿbᵐ | n > m } regular?',
    a: false,
    exp: 'No. Comparing n and m requires counting that exceeds finite memory capacity.'
  },
  {
    q: 'Is L = { aⁿ | n is prime } regular?',
    a: false,
    exp: "No. The set of primes has no periodic structure. A classic pumping argument shows xyⁱz exits the primes for most i."
  },
  {
    q: "Is L = { a } (just the string 'a') regular?",
    a: true,
    exp: "Yes. All finite languages are regular. A small DFA accepts exactly 'a'."
  },
  {
    q: "Is L = { strings over {a,b} with equal a's and b's } regular?",
    a: false,
    exp: "No. Tracking equality requires counting — beyond finite automata power."
  }
];
