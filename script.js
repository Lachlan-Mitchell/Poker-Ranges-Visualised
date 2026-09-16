const ranks = ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"];
const TOTAL_COMBOS = 1326;
const STORAGE_KEY = "pokerRangeTracker.v2";

const PREMADE_TEMPLATES = [
  {
    id: "utg-open-lc",
    gameType: "LIVE CASH",
    name: "UTG Open",
    hands: [
      "AA",
      "AKs",
      "AQs",
      "AJs",
      "ATs",
      "A9s",
      "A8s",
      "A7s",
      "A6s",
      "A5s",
      "A4s",
      "A3s",
      "AKo",
      "KK",
      "KQs",
      "KJs",
      "KTs",
      "K9s",
      "K6s",
      "K5s",
      "AQo",
      "KQo",
      "QQ",
      "QJs",
      "QTs",
      "JJ",
      "JTs",
      "TT",
      "99",
      "88",
      "77",
    ],
  },
  {
    id: "mp-open-lc",
    gameType: "LIVE CASH",
    name: "MP Open",
    hands: [
      "AA",
      "AKs",
      "AQs",
      "AJs",
      "ATs",
      "A9s",
      "A8s",
      "A7s",
      "A6s",
      "A5s",
      "A4s",
      "A3s",
      "AKo",
      "KK",
      "KQs",
      "KJs",
      "KTs",
      "K9s",
      "K6s",
      "AQo",
      "KQo",
      "QQ",
      "QJs",
      "QTs",
      "AJo",
      "KJo",
      "JJ",
      "JTs",
      "TT",
      "99",
      "88",
      "77",
      "66",
    ],
  },
  {
    id: "lj-open-lc",
    gameType: "LIVE CASH",
    name: "LJ Open",
    hands: [
      "AA",
      "AKs",
      "AQs",
      "AJs",
      "ATs",
      "A9s",
      "A8s",
      "A7s",
      "A6s",
      "A5s",
      "A4s",
      "A3s",
      "AKo",
      "KK",
      "KQs",
      "KJs",
      "KTs",
      "K9s",
      "K8s",
      "K6s",
      "K5s",
      "AQo",
      "KQo",
      "QQ",
      "QJs",
      "QTs",
      "AJo",
      "KJo",
      "JJ",
      "JTs",
      "TT",
      "99",
      "88",
      "77",
      "66",
    ],
  },
  {
    id: "hj-open-lc",
    gameType: "LIVE CASH",
    name: "HJ Open",
    hands: [
      "AA",
      "AKs",
      "AQs",
      "AJs",
      "ATs",
      "A9s",
      "A8s",
      "A7s",
      "A6s",
      "A5s",
      "A4s",
      "A3s",
      "AKo",
      "KK",
      "KQs",
      "KJs",
      "KTs",
      "K9s",
      "K8s",
      "K6s",
      "AQo",
      "KQo",
      "QQ",
      "QJs",
      "QTs",
      "Q9s",
      "AJo",
      "KJo",
      "QJo",
      "JJ",
      "JTs",
      "ATo",
      "KTo",
      "QTo",
      "TT",
      "T9s",
      "99",
      "88",
      "77",
      "66",
    ],
  },
  {
    id: "co-open-lc",
    gameType: "LIVE CASH",
    name: "CO Open",
    hands: [
      "AA",
      "AKs",
      "AQs",
      "AJs",
      "ATs",
      "A9s",
      "A8s",
      "A7s",
      "A6s",
      "A5s",
      "A4s",
      "A3s",
      "A2s",
      "AKo",
      "KK",
      "KQs",
      "KJs",
      "KTs",
      "K9s",
      "K8s",
      "K7s",
      "K6s",
      "AQo",
      "KQo",
      "QQ",
      "QJs",
      "QTs",
      "Q9s",
      "Q8s",
      "AJo",
      "KJo",
      "QJo",
      "JJ",
      "JTs",
      "J9s",
      "J8s",
      "ATo",
      "KTo",
      "QTo",
      "JTo",
      "TT",
      "T9s",
      "A9o",
      "99",
      "88",
      "77",
      "66",
      "55",
    ],
  },
  {
    id: "bu-open-lc",
    gameType: "LIVE CASH",
    name: "BU Open",
    hands: [
      "AA",
      "AKs",
      "AQs",
      "AJs",
      "ATs",
      "A9s",
      "A8s",
      "A7s",
      "A6s",
      "A5s",
      "A4s",
      "A3s",
      "A2s",
      "AKo",
      "KK",
      "KQs",
      "KJs",
      "KTs",
      "K9s",
      "K8s",
      "K7s",
      "K6s",
      "K5s",
      "K4s",
      "K3s",
      "AQo",
      "KQo",
      "QQ",
      "QJs",
      "QTs",
      "Q9s",
      "Q8s",
      "Q7s",
      "Q6s",
      "Q5s",
      "AJo",
      "KJo",
      "QJo",
      "JJ",
      "JTs",
      "J9s",
      "J8s",
      "J7s",
      "ATo",
      "KTo",
      "QTo",
      "JTo",
      "TT",
      "T9s",
      "T8s",
      "T7s",
      "A9o",
      "K9o",
      "Q9o",
      "J9o",
      "T9o",
      "99",
      "98s",
      "97s",
      "A8o",
      "K8o",
      "88",
      "87s",
      "A7o",
      "K7o",
      "77",
      "76s",
      "A6o",
      "K6o",
      "66",
      "A5o",
      "K5o",
      "55",
      "44",
    ],
  },
  {
    id: "sb-open-lc",
    gameType: "LIVE CASH",
    name: "SB Open",
    hands: [
      "AA",
      "AKs",
      "AQs",
      "AJs",
      "ATs",
      "A9s",
      "A8s",
      "A7s",
      "A6s",
      "A5s",
      "A4s",
      "A3s",
      "A2s",
      "AKo",
      "KK",
      "KQs",
      "KJs",
      "KTs",
      "K9s",
      "K8s",
      "K7s",
      "K6s",
      "K5s",
      "K4s",
      "K3s",
      "K2s",
      "AQo",
      "KQo",
      "QQ",
      "QJs",
      "QTs",
      "Q9s",
      "Q8s",
      "Q7s",
      "Q6s",
      "Q5s",
      "Q4s",
      "Q3s",
      "AJo",
      "KJo",
      "QJo",
      "JJ",
      "JTs",
      "J9s",
      "J8s",
      "J7s",
      "J6s",
      "J5s",
      "ATo",
      "KTo",
      "QTo",
      "JTo",
      "TT",
      "T9s",
      "T8s",
      "T7s",
      "T6s",
      "A9o",
      "K9o",
      "Q9o",
      "J9o",
      "T9o",
      "99",
      "98s",
      "97s",
      "96s",
      "A8o",
      "K8o",
      "Q8o",
      "T8o",
      "98o",
      "88",
      "87s",
      "86s",
      "A7o",
      "K7o",
      "77",
      "76s",
      "75s",
      "A6o",
      "K6o",
      "66",
      "65s",
      "A5o",
      "K5o",
      "55",
      "54s",
      "A4o",
      "K4o",
      "44",
      "33",
      "22",
    ],
  },
  {
    id: "hj-3-bet-utg-open-lc",
    gameType: "LIVE CASH 3-BET",
    name: "HJ 3-Bet (UTG Open)",
    hands: [
      "AA",
      "AKs",
      "AJs",
      "ATs",
      "A8s",
      "A5s",
      "A4s",
      "A3s",
      "AKo",
      "KK",
      "KQs",
      "KJs",
      "KTs",
      "AQo",
      "QQ",
      "JJ",
      "TT",
      "99",
    ],
  },
  {
    id: "bu-3-bet-hj-open-lc",
    gameType: "LIVE CASH 3-BET",
    name: "BU 3-Bet (HJ Open)",
    hands: [
      "AA",
      "AKs",
      "AQs",
      "ATs",
      "A9s",
      "A8s",
      "A5s",
      "A4s",
      "AKo",
      "KK",
      "KJs",
      "KTs",
      "K9s",
      "K6s",
      "AQo",
      "KQo",
      "QQ",
      "QJs",
      "QTs",
      "AJo",
      "JJ",
      "JTs",
      "TT",
      "99",
      "88",
      "77",
    ],
  },
  {
    id: "bb-3-bet-co-open-lc",
    gameType: "LIVE CASH 3-BET",
    name: "BB 3-Bet (CO Open)",
    hands: [
      "AA",
      "AKs",
      "AQs",
      "AJs",
      "A8s",
      "A7s",
      "A6s",
      "A5s",
      "A4s",
      "A3s",
      "A2s",
      "AKo",
      "KK",
      "KQs",
      "KJs",
      "KTs",
      "K9s",
      "K8s",
      "K6s",
      "AQo",
      "KQo",
      "QQ",
      "QJs",
      "QTs",
      "Q9s",
      "AJo",
      "KJo",
      "JJ",
      "JTs",
      "J9s",
      "TT",
      "T9s",
      "99",
      "98s",
      "88",
      "87s",
      "77",
      "76s",
      "66",
      "65s",
    ],
  },
  {
    id: "bu-3-bet-lj-open-co-call-lc",
    gameType: "LIVE CASH 3-BET",
    name: "BU 3-Bet (LJ Open, CO Call)",
    hands: [
      "AA",
      "AKs",
      "A5s",
      "AKo",
      "KK",
      "KQs",
      "KJs",
      "KTs",
      "K6s",
      "AQo",
      "KQo",
      "QQ",
      "TT",
      "88",
    ],
  },
  {
    id: "sb-3-bet-lj-open-bu-call-lc",
    gameType: "LIVE CASH 3-BET",
    name: "SB 3-Bet (LJ Open, BU Call)",
    hands: ["AA", "AKs", "AQs", "AKo", "KK", "KQs", "KQo", "QQ", "JJ"],
  },
  {
    id: "utg-open-raise-lc6",
    gameType: "6-MAX CASH",
    name: "UTG Open Raise",
    hands: [
      "AA",
      "AKs",
      "AQs",
      "AJs",
      "ATs",
      "A9s",
      "A8s",
      "A7s",
      "A6s",
      "A5s",
      "A4s",
      "A3s",
      "A2s",
      "AKo",
      "KK",
      "KQs",
      "KJs",
      "KTs",
      "K9s",
      "K8s",
      "K7s",
      "AQo",
      "KQo",
      "QQ",
      "QJs",
      "QTs",
      "Q9s",
      "AJo",
      "KJo",
      "QJo",
      "JJ",
      "JTs",
      "ATo",
      "KTo",
      "TT",
      "99",
      "88",
      "77",
      "66",
    ],
  },
  {
    id: "hj-open-raise-lc6",
    gameType: "6-MAX CASH",
    name: "HJ Open Raise",
    hands: [
      "AA",
      "AKs",
      "AQs",
      "AJs",
      "ATs",
      "A9s",
      "A8s",
      "A7s",
      "A6s",
      "A5s",
      "A4s",
      "A3s",
      "A2s",
      "AKo",
      "KK",
      "KQs",
      "KJs",
      "KTs",
      "K9s",
      "K8s",
      "K7s",
      "K6s",
      "K5s",
      "AQo",
      "KQo",
      "QQ",
      "QJs",
      "QTs",
      "Q9s",
      "Q8s",
      "AJo",
      "KJo",
      "QJo",
      "JJ",
      "JTs",
      "J9s",
      "ATo",
      "KTo",
      "QTo",
      "TT",
      "A9o",
      "99",
      "A8o",
      "88",
      "77",
      "66",
    ],
  },
  {
    id: "co-open-raise-lc6",
    gameType: "6-MAX CASH",
    name: "CO Open Raise",
    hands: [
      "AA",
      "AKs",
      "AQs",
      "AJs",
      "ATs",
      "A9s",
      "A8s",
      "A7s",
      "A6s",
      "A5s",
      "A4s",
      "A3s",
      "A2s",
      "AKo",
      "KK",
      "KQs",
      "KJs",
      "KTs",
      "K9s",
      "K8s",
      "K7s",
      "K6s",
      "K5s",
      "K4s",
      "AQo",
      "KQo",
      "QQ",
      "QJs",
      "QTs",
      "Q9s",
      "Q8s",
      "Q7s",
      "Q6s",
      "Q5s",
      "AJo",
      "KJo",
      "QJo",
      "JJ",
      "JTs",
      "J9s",
      "J8s",
      "J7s",
      "ATo",
      "KTo",
      "QTo",
      "JTo",
      "TT",
      "T9s",
      "T8s",
      "A9o",
      "K9o",
      "99",
      "A8o",
      "88",
      "A7o",
      "77",
      "66",
      "A5o",
      "55",
    ],
  },
  {
    id: "bu-open-raise-lc6",
    gameType: "6-MAX CASH",
    name: "BU Open Raise",
    hands: [
      "AA",
      "AKs",
      "AQs",
      "AJs",
      "ATs",
      "A9s",
      "A8s",
      "A7s",
      "A6s",
      "A5s",
      "A4s",
      "A3s",
      "A2s",
      "AKo",
      "KK",
      "KQs",
      "KJs",
      "KTs",
      "K9s",
      "K8s",
      "K7s",
      "K6s",
      "K5s",
      "K4s",
      "K3s",
      "K2s",
      "AQo",
      "KQo",
      "QQ",
      "QJs",
      "QTs",
      "Q9s",
      "Q8s",
      "Q7s",
      "Q6s",
      "Q5s",
      "Q4s",
      "Q3s",
      "AJo",
      "KJo",
      "QJo",
      "JJ",
      "JTs",
      "J9s",
      "J8s",
      "J7s",
      "J6s",
      "J5s",
      "J4s",
      "ATo",
      "KTo",
      "QTo",
      "JTo",
      "TT",
      "T9s",
      "T8s",
      "T7s",
      "T6s",
      "A9o",
      "K9o",
      "Q9o",
      "J9o",
      "T9o",
      "99",
      "98s",
      "97s",
      "96s",
      "A8o",
      "K8o",
      "T8o",
      "88",
      "87s",
      "86s",
      "A7o",
      "K7o",
      "77",
      "76s",
      "A6o",
      "K6o",
      "66",
      "A5o",
      "K5o",
      "55",
      "A4o",
      "K4o",
      "44",
      "A3o",
      "K3o",
      "33",
      "22",
    ],
  },
  {
    id: "sb-open-raise-lc6",
    gameType: "6-MAX CASH",
    name: "SB Open Raise",
    hands: [
      "AA",
      "AKs",
      "AQs",
      "AJs",
      "ATs",
      "A9s",
      "A8s",
      "A7s",
      "A6s",
      "A5s",
      "A4s",
      "A3s",
      "A2s",
      "AKo",
      "KK",
      "KQs",
      "KJs",
      "KTs",
      "K9s",
      "K8s",
      "K7s",
      "K6s",
      "K5s",
      "K4s",
      "K3s",
      "K2s",
      "AQo",
      "KQo",
      "QQ",
      "QJs",
      "QTs",
      "Q9s",
      "Q8s",
      "Q7s",
      "Q6s",
      "Q5s",
      "Q4s",
      "Q3s",
      "Q2s",
      "AJo",
      "KJo",
      "QJo",
      "JJ",
      "JTs",
      "J9s",
      "J8s",
      "J7s",
      "J6s",
      "J5s",
      "J4s",
      "ATo",
      "KTo",
      "QTo",
      "JTo",
      "TT",
      "T9s",
      "T8s",
      "T7s",
      "T6s",
      "A9o",
      "K9o",
      "Q9o",
      "J9o",
      "T9o",
      "99",
      "98s",
      "97s",
      "96s",
      "A8o",
      "K8o",
      "T8o",
      "98o",
      "88",
      "87s",
      "86s",
      "A7o",
      "77",
      "76s",
      "75s",
      "A6o",
      "66",
      "65s",
      "A5o",
      "55",
      "54s",
      "A4o",
      "44",
      "A3o",
      "33",
      "22",
    ],
  },
  {
    id: "hj-3-bet-or-call-lc6",
    gameType: "6-MAX CASH 3-BET",
    name: "HJ 3-Bet or Call",
    hands: [
      "AA",
      "AKs",
      "AQs",
      "AJs",
      "ATs",
      "A5s",
      "A4s",
      "AKo",
      "KK",
      "KQs",
      "KJs",
      "KTs",
      "AQo",
      "KQo",
      "QQ",
      "JJ",
      "TT",
      "65s",
    ],
  },
  {
    id: "co-3-bet-or-call-lc6",
    gameType: "6-MAX CASH 3-BET",
    name: "CO 3-Bet or Call",
    hands: [
      "AA",
      "AKs",
      "AQs",
      "AJs",
      "ATs",
      "A5s",
      "A4s",
      "A3s",
      "AKo",
      "KK",
      "KQs",
      "KJs",
      "KTs",
      "AQo",
      "KQo",
      "QQ",
      "QJs",
      "JJ",
      "TT",
      "65s",
    ],
  },
  {
    id: "bu-3-bet-or-call-lc6",
    gameType: "6-MAX CASH 3-BET",
    name: "BU 3-Bet or Call",
    hands: [
      "AA",
      "AKs",
      "AQs",
      "AJs",
      "ATs",
      "A7s",
      "A5s",
      "A4s",
      "A3s",
      "AKo",
      "KK",
      "KQs",
      "KJs",
      "AQo",
      "KQo",
      "QQ",
      "QJs",
      "JJ",
      "TT",
      "99",
      "65s",
    ],
  },
  {
    id: "sb-3-bet-or-call-lc6",
    gameType: "6-MAX CASH 3-BET",
    name: "SB 3-Bet or Call",
    hands: [
      "AA",
      "AKs",
      "AQs",
      "AJs",
      "ATs",
      "A5s",
      "A4s",
      "AKo",
      "KK",
      "KQs",
      "KJs",
      "KTs",
      "AQo",
      "KQo",
      "QQ",
      "QJs",
      "JJ",
      "TT",
      "99",
      "65s",
    ],
  },
  {
    id: "bb-3-bet-or-call-lc6",
    gameType: "6-MAX CASH 3-BET",
    name: "BB 3-Bet or Call",
    hands: [
      "AA",
      "AKs",
      "AQs",
      "AJs",
      "ATs",
      "A9s",
      "A8s",
      "A7s",
      "A6s",
      "A5s",
      "A4s",
      "A3s",
      "A2s",
      "AKo",
      "KK",
      "KQs",
      "KJs",
      "KTs",
      "K9s",
      "K8s",
      "K7s",
      "K6s",
      "K5s",
      "K3s",
      "K2s",
      "AQo",
      "KQo",
      "QQ",
      "QJs",
      "QTs",
      "Q9s",
      "Q8s",
      "AJo",
      "KJo",
      "QJo",
      "JJ",
      "JTs",
      "J9s",
      "J8s",
      "ATo",
      "KTo",
      "TT",
      "T9s",
      "T8s",
      "T7s",
      "99",
      "98s",
      "97s",
      "88",
      "87s",
      "86s",
      "77",
      "76s",
      "75s",
      "66",
      "65s",
      "64s",
      "55",
      "54s",
      "53s",
      "44",
      "43s",
      "33",
      "22",
    ],
  },
  {
    id: "ep1-open-mtt20",
    gameType: "20BB MTT OPEN",
    name: "EP1 Open",
    hands: [
      "AA",
      "AKs",
      "AQs",
      "AJs",
      "ATs",
      "A9s",
      "A8s",
      "A7s",
      "A6s",
      "A5s",
      "A4s",
      "AKo",
      "KK",
      "KQs",
      "KJs",
      "KTs",
      "K9s",
      "K8s",
      "AQo",
      "KQo",
      "QQ",
      "QJs",
      "QTs",
      "Q9s",
      "AJo",
      "KJo",
      "JJ",
      "JTs",
      "J9s",
      "ATo",
      "KTo",
      "TT",
      "T9s",
      "T8s",
      "99",
      "98s",
      "88",
      "77",
      "66",
    ],
  },
  {
    id: "ep2-open-mtt20",
    gameType: "20BB MTT OPEN",
    name: "EP2 Open",
    hands: [
      "AA",
      "AKs",
      "AQs",
      "AJs",
      "ATs",
      "A9s",
      "A8s",
      "A7s",
      "A6s",
      "A5s",
      "A4s",
      "A3s",
      "AKo",
      "KK",
      "KQs",
      "KJs",
      "KTs",
      "K9s",
      "K8s",
      "K7s",
      "AQo",
      "KQo",
      "QQ",
      "QJs",
      "QTs",
      "Q9s",
      "Q8s",
      "AJo",
      "KJo",
      "QJo",
      "JJ",
      "JTs",
      "J9s",
      "ATo",
      "KTo",
      "TT",
      "T9s",
      "T8s",
      "A9o",
      "K9o",
      "99",
      "98s",
      "88",
      "77",
      "66",
    ],
  },
  {
    id: "ep3-open-mtt20",
    gameType: "20BB MTT OPEN",
    name: "EP3 Open",
    hands: [
      "AA",
      "AKs",
      "AQs",
      "AJs",
      "ATs",
      "A9s",
      "A8s",
      "A7s",
      "A6s",
      "A5s",
      "A4s",
      "A3s",
      "AKo",
      "KK",
      "KQs",
      "KJs",
      "KTs",
      "K9s",
      "K8s",
      "K7s",
      "AQo",
      "KQo",
      "QQ",
      "QJs",
      "QTs",
      "Q9s",
      "Q8s",
      "AJo",
      "KJo",
      "QJo",
      "JJ",
      "JTs",
      "J9s",
      "ATo",
      "KTo",
      "QTo",
      "TT",
      "T9s",
      "T8s",
      "A9o",
      "K9o",
      "99",
      "98s",
      "88",
      "87s",
      "77",
      "66",
    ],
  },
  {
    id: "lj-open-mtt20",
    gameType: "20BB MTT OPEN",
    name: "LJ Open",
    hands: [
      "AA",
      "AKs",
      "AQs",
      "AJs",
      "ATs",
      "A9s",
      "A8s",
      "A7s",
      "A6s",
      "A5s",
      "A4s",
      "A3s",
      "AKo",
      "KK",
      "KQs",
      "KJs",
      "KTs",
      "K9s",
      "K8s",
      "K7s",
      "K6s",
      "AQo",
      "KQo",
      "QQ",
      "QJs",
      "QTs",
      "Q9s",
      "Q8s",
      "AJo",
      "KJo",
      "QJo",
      "JJ",
      "JTs",
      "J9s",
      "J8s",
      "ATo",
      "KTo",
      "QTo",
      "JTo",
      "TT",
      "T9s",
      "T8s",
      "A9o",
      "K9o",
      "99",
      "98s",
      "A8o",
      "K8o",
      "88",
      "87s",
      "77",
      "66",
      "55",
    ],
  },
  {
    id: "hj-open-mtt20",
    gameType: "20BB MTT OPEN",
    name: "HJ Open",
    hands: [
      "AA",
      "AKs",
      "AQs",
      "AJs",
      "ATs",
      "A9s",
      "A8s",
      "A7s",
      "A6s",
      "A5s",
      "A4s",
      "A3s",
      "A2s",
      "AKo",
      "KK",
      "KQs",
      "KJs",
      "KTs",
      "K9s",
      "K8s",
      "K7s",
      "K6s",
      "K5s",
      "AQo",
      "KQo",
      "QQ",
      "QJs",
      "QTs",
      "Q9s",
      "Q8s",
      "Q7s",
      "AJo",
      "KJo",
      "QJo",
      "JJ",
      "JTs",
      "J9s",
      "J8s",
      "ATo",
      "KTo",
      "QTo",
      "JTo",
      "TT",
      "T9s",
      "T8s",
      "A9o",
      "K9o",
      "99",
      "98s",
      "97s",
      "A8o",
      "K8o",
      "88",
      "87s",
      "A7o",
      "K7o",
      "77",
      "66",
      "55",
    ],
  },
  {
    id: "co-open-mtt20",
    gameType: "20BB MTT OPEN",
    name: "CO Open",
    hands: [
      "AA",
      "AKs",
      "AQs",
      "AJs",
      "ATs",
      "A9s",
      "A8s",
      "A7s",
      "A6s",
      "A5s",
      "A4s",
      "A3s",
      "A2s",
      "AKo",
      "KK",
      "KQs",
      "KJs",
      "KTs",
      "K9s",
      "K8s",
      "K7s",
      "K6s",
      "K5s",
      "AQo",
      "KQo",
      "QQ",
      "QJs",
      "QTs",
      "Q9s",
      "Q8s",
      "Q7s",
      "Q6s",
      "AJo",
      "KJo",
      "QJo",
      "JJ",
      "JTs",
      "J9s",
      "J8s",
      "J7s",
      "ATo",
      "KTo",
      "QTo",
      "JTo",
      "TT",
      "T9s",
      "T8s",
      "T7s",
      "A9o",
      "K9o",
      "Q9o",
      "T9o",
      "99",
      "98s",
      "97s",
      "A8o",
      "K8o",
      "88",
      "87s",
      "A7o",
      "K7o",
      "77",
      "A6o",
      "K6o",
      "66",
      "A5o",
      "K5o",
      "55",
      "44",
    ],
  },
  {
    id: "bu-open-mtt20",
    gameType: "20BB MTT OPEN",
    name: "BU Open",
    hands: [
      "AA",
      "AKs",
      "AQs",
      "AJs",
      "ATs",
      "A9s",
      "A8s",
      "A7s",
      "A6s",
      "A5s",
      "A4s",
      "A3s",
      "A2s",
      "AKo",
      "KK",
      "KQs",
      "KJs",
      "KTs",
      "K9s",
      "K8s",
      "K7s",
      "K6s",
      "K5s",
      "K4s",
      "K3s",
      "AQo",
      "KQo",
      "QQ",
      "QJs",
      "QTs",
      "Q9s",
      "Q8s",
      "Q7s",
      "Q6s",
      "Q5s",
      "Q4s",
      "AJo",
      "KJo",
      "QJo",
      "JJ",
      "JTs",
      "J9s",
      "J8s",
      "J7s",
      "J6s",
      "J5s",
      "ATo",
      "KTo",
      "QTo",
      "JTo",
      "TT",
      "T9s",
      "T8s",
      "T7s",
      "T6s",
      "A9o",
      "K9o",
      "Q9o",
      "J9o",
      "T9o",
      "99",
      "98s",
      "97s",
      "96s",
      "A8o",
      "K8o",
      "Q8o",
      "J8o",
      "T8o",
      "88",
      "87s",
      "86s",
      "A7o",
      "K7o",
      "77",
      "76s",
      "A6o",
      "K6o",
      "66",
      "A5o",
      "K5o",
      "55",
      "A4o",
      "K4o",
      "44",
    ],
  },
  {
    id: "ep2-3-bet-mtt20",
    gameType: "20BB 3-BET JAM",
    name: "EP2 3-Bet",
    hands: [
      "AKs",
      "AQs",
      "A5s",
      "AKo",
      "KK",
      "KQs",
      "KJs",
      "AQo",
      "KQo",
      "QQ",
      "QJs",
      "JJ",
      "TT",
      "99",
    ],
  },
  {
    id: "ep3-3-bet-mtt20",
    gameType: "20BB 3-BET JAM",
    name: "EP3 3-Bet",
    hands: [
      "AKs",
      "AQs",
      "AKo",
      "KK",
      "KQs",
      "KJs",
      "AQo",
      "KQo",
      "QQ",
      "QJs",
      "JJ",
      "TT",
      "99",
      "66",
    ],
  },
  {
    id: "lj-3-bet-mtt20",
    gameType: "20BB 3-BET JAM",
    name: "LJ 3-Bet",
    hands: [
      "AKs",
      "AKo",
      "KK",
      "KQs",
      "KJs",
      "AQo",
      "KQo",
      "QQ",
      "QJs",
      "JJ",
      "TT",
      "99",
      "88",
    ],
  },
  {
    id: "hj-3-bet-mtt20",
    gameType: "20BB 3-BET JAM",
    name: "HJ 3-Bet",
    hands: [
      "AKs",
      "AKo",
      "KK",
      "KQs",
      "KJs",
      "AQo",
      "KQo",
      "QQ",
      "QJs",
      "JJ",
      "TT",
      "99",
      "88",
      "66",
    ],
  },
  {
    id: "co-3-bet-mtt20",
    gameType: "20BB 3-BET JAM",
    name: "CO 3-Bet",
    hands: [
      "AKs",
      "AQs",
      "A5s",
      "AKo",
      "KK",
      "KQs",
      "KJs",
      "AQo",
      "KQo",
      "QQ",
      "QJs",
      "JJ",
      "TT",
      "99",
      "88",
      "66",
    ],
  },
  {
    id: "bu-3-bet-mtt20",
    gameType: "20BB 3-BET JAM",
    name: "BU 3-Bet",
    hands: [
      "AKs",
      "A5s",
      "A4s",
      "AKo",
      "KK",
      "KQs",
      "KJs",
      "AQo",
      "KQo",
      "QQ",
      "QJs",
      "JJ",
      "TT",
      "99",
      "88",
      "55",
    ],
  },
  {
    id: "sb-3-bet-mtt20",
    gameType: "20BB 3-BET JAM",
    name: "SB 3-Bet",
    hands: [
      "AA",
      "AKs",
      "AQs",
      "AJs",
      "ATs",
      "AKo",
      "KK",
      "KQs",
      "KJs",
      "KTs",
      "AQo",
      "KQo",
      "QQ",
      "QJs",
      "QTs",
      "AJo",
      "KJo",
      "JJ",
      "JTs",
      "TT",
      "99",
      "88",
      "77",
      "66",
      "55",
    ],
  },
  {
    id: "bb-3-bet-mtt20",
    gameType: "20BB 3-BET JAM",
    name: "BB 3-Bet",
    hands: [
      "AKs",
      "A5s",
      "A4s",
      "AKo",
      "KK",
      "KJs",
      "KTs",
      "AQo",
      "KQo",
      "QQ",
      "QJs",
      "JJ",
      "JTs",
      "TT",
      "99",
      "88",
      "55",
      "44",
      "33",
    ],
  },
  {
    id: "ep1-open-shoves",
    gameType: "10BB PUSH/FOLD MTT",
    name: "EP1 Open Shoves",
    hands: [
      "AA",
      "AKs",
      "AQs",
      "AJs",
      "ATs",
      "A9s",
      "A8s",
      "A7s",
      "A5s",
      "A4s",
      "A3s",
      "AKo",
      "KK",
      "KQs",
      "KJs",
      "KTs",
      "K9s",
      "AQo",
      "KQo",
      "QQ",
      "QJs",
      "QTs",
      "AJo",
      "JJ",
      "JTs",
      "TT",
      "99",
      "88",
      "77",
      "66",
      "55",
    ],
  },
  {
    id: "ep2-open-shoves",
    gameType: "10BB PUSH/FOLD MTT",
    name: "EP2 Open Shoves",
    hands: [
      "AA",
      "AKs",
      "AQs",
      "AJs",
      "ATs",
      "A9s",
      "A8s",
      "A7s",
      "A5s",
      "A4s",
      "A3s",
      "A2s",
      "AKo",
      "KK",
      "KQs",
      "KJs",
      "KTs",
      "K9s",
      "AQo",
      "KQo",
      "QQ",
      "QJs",
      "QTs",
      "Q9s",
      "AJo",
      "KJo",
      "JJ",
      "JTs",
      "ATo",
      "TT",
      "T9s",
      "99",
      "88",
      "77",
      "66",
      "55",
      "44",
    ],
  },
  {
    id: "ep3-open-shoves",
    gameType: "10BB PUSH/FOLD MTT",
    name: "EP3 Open Shoves",
    hands: [
      "AA",
      "AKs",
      "AQs",
      "AJs",
      "ATs",
      "A9s",
      "A8s",
      "A7s",
      "A6s",
      "A5s",
      "A4s",
      "A3s",
      "A2s",
      "AKo",
      "KK",
      "KQs",
      "KJs",
      "KTs",
      "K9s",
      "AQo",
      "KQo",
      "QQ",
      "QJs",
      "QTs",
      "Q9s",
      "AJo",
      "KJo",
      "JJ",
      "JTs",
      "J9s",
      "ATo",
      "KTo",
      "TT",
      "T9s",
      "99",
      "88",
      "77",
      "66",
      "55",
      "44",
      "33",
    ],
  },
  {
    id: "lj-open-shoves",
    gameType: "10BB PUSH/FOLD MTT",
    name: "LJ Open Shoves",
    hands: [
      "AA",
      "AKs",
      "AQs",
      "AJs",
      "ATs",
      "A9s",
      "A8s",
      "A7s",
      "A6s",
      "A5s",
      "A4s",
      "A3s",
      "A2s",
      "AKo",
      "KK",
      "KQs",
      "KJs",
      "KTs",
      "K9s",
      "K8s",
      "K7s",
      "AQo",
      "KQo",
      "QQ",
      "QJs",
      "QTs",
      "Q9s",
      "Q8s",
      "AJo",
      "KJo",
      "QJo",
      "JJ",
      "JTs",
      "J9s",
      "ATo",
      "KTo",
      "QTo",
      "TT",
      "T9s",
      "T8s",
      "A9o",
      "99",
      "98s",
      "88",
      "77",
      "66",
      "55",
      "44",
      "33",
      "22",
    ],
  },
  {
    id: "hj-open-shoves",
    gameType: "10BB PUSH/FOLD MTT",
    name: "HJ Open Shoves",
    hands: [
      "AA",
      "AKs",
      "AQs",
      "AJs",
      "ATs",
      "A9s",
      "A8s",
      "A7s",
      "A6s",
      "A5s",
      "A4s",
      "A3s",
      "A2s",
      "AKo",
      "KK",
      "KQs",
      "KJs",
      "KTs",
      "K9s",
      "K8s",
      "K7s",
      "K6s",
      "AQo",
      "KQo",
      "QQ",
      "QJs",
      "QTs",
      "Q9s",
      "Q8s",
      "AJo",
      "KJo",
      "QJo",
      "JJ",
      "JTs",
      "J9s",
      "J8s",
      "ATo",
      "KTo",
      "QTo",
      "JTo",
      "TT",
      "T9s",
      "T8s",
      "A9o",
      "99",
      "98s",
      "A8o",
      "88",
      "87s",
      "A7o",
      "77",
      "66",
      "A5o",
      "55",
      "44",
      "33",
      "22",
    ],
  },
  {
    id: "co-open-shoves",
    gameType: "10BB PUSH/FOLD MTT",
    name: "CO Open Shoves",
    hands: [
      "AA",
      "AKs",
      "AQs",
      "AJs",
      "ATs",
      "A9s",
      "A8s",
      "A7s",
      "A6s",
      "A5s",
      "A4s",
      "A3s",
      "A2s",
      "AKo",
      "KK",
      "KQs",
      "KJs",
      "KTs",
      "K9s",
      "K8s",
      "K7s",
      "K6s",
      "K5s",
      "K4s",
      "AQo",
      "KQo",
      "QQ",
      "QJs",
      "QTs",
      "Q9s",
      "Q8s",
      "Q7s",
      "Q6s",
      "AJo",
      "KJo",
      "QJo",
      "JJ",
      "JTs",
      "J9s",
      "J8s",
      "J7s",
      "ATo",
      "KTo",
      "QTo",
      "JTo",
      "TT",
      "T9s",
      "T8s",
      "T7s",
      "A9o",
      "T9o",
      "99",
      "98s",
      "97s",
      "A8o",
      "88",
      "87s",
      "86s",
      "A7o",
      "77",
      "76s",
      "A6o",
      "66",
      "A5o",
      "55",
      "A4o",
      "44",
      "A3o",
      "33",
      "A2o",
      "22",
    ],
  },
  {
    id: "bu-open-shoves",
    gameType: "10BB PUSH/FOLD MTT",
    name: "BU Open Shoves",
    hands: [
      "AA",
      "AKs",
      "AQs",
      "AJs",
      "ATs",
      "A9s",
      "A8s",
      "A7s",
      "A6s",
      "A5s",
      "A4s",
      "A3s",
      "A2s",
      "AKo",
      "KK",
      "KQs",
      "KJs",
      "KTs",
      "K9s",
      "K8s",
      "K7s",
      "K6s",
      "K5s",
      "K4s",
      "K3s",
      "K2s",
      "AQo",
      "KQo",
      "QQ",
      "QJs",
      "QTs",
      "Q9s",
      "Q8s",
      "Q7s",
      "Q6s",
      "Q5s",
      "Q4s",
      "AJo",
      "KJo",
      "QJo",
      "JJ",
      "JTs",
      "J9s",
      "J8s",
      "J7s",
      "J6s",
      "ATo",
      "KTo",
      "QTo",
      "JTo",
      "TT",
      "T9s",
      "T8s",
      "T7s",
      "T6s",
      "A9o",
      "K9o",
      "Q9o",
      "J9o",
      "T9o",
      "99",
      "98s",
      "97s",
      "96s",
      "A8o",
      "98o",
      "88",
      "87s",
      "86s",
      "85s",
      "A7o",
      "77",
      "76s",
      "75s",
      "A6o",
      "66",
      "65s",
      "A5o",
      "55",
      "54s",
      "A4o",
      "44",
      "A3o",
      "33",
      "A2o",
      "22",
    ],
  },
  {
    id: "sb-open-shoves",
    gameType: "10BB PUSH/FOLD MTT",
    name: "SB Open Shoves",
    hands: [
      "AA",
      "AKs",
      "AQs",
      "AJs",
      "ATs",
      "A9s",
      "A8s",
      "A7s",
      "A6s",
      "A5s",
      "A4s",
      "A3s",
      "A2s",
      "AKo",
      "KK",
      "KQs",
      "KJs",
      "KTs",
      "K9s",
      "K8s",
      "K7s",
      "K6s",
      "K5s",
      "K4s",
      "K3s",
      "K2s",
      "AQo",
      "KQo",
      "QQ",
      "QJs",
      "QTs",
      "Q9s",
      "Q8s",
      "Q7s",
      "Q6s",
      "Q5s",
      "Q4s",
      "Q3s",
      "Q2s",
      "AJo",
      "KJo",
      "QJo",
      "JJ",
      "JTs",
      "J9s",
      "J8s",
      "J7s",
      "J6s",
      "J5s",
      "J4s",
      "J3s",
      "J2s",
      "ATo",
      "KTo",
      "QTo",
      "JTo",
      "TT",
      "T9s",
      "T8s",
      "T7s",
      "T6s",
      "T5s",
      "T4s",
      "T3s",
      "T2s",
      "A9o",
      "K9o",
      "Q9o",
      "J9o",
      "T9o",
      "99",
      "98s",
      "97s",
      "96s",
      "95s",
      "94s",
      "93s",
      "92s",
      "A8o",
      "K8o",
      "Q8o",
      "J8o",
      "T8o",
      "98o",
      "88",
      "87s",
      "86s",
      "85s",
      "84s",
      "83s",
      "A7o",
      "K7o",
      "Q7o",
      "J7o",
      "T7o",
      "97o",
      "87o",
      "77",
      "76s",
      "75s",
      "74s",
      "73s",
      "A6o",
      "K6o",
      "Q6o",
      "J6o",
      "T6o",
      "96o",
      "86o",
      "76o",
      "66",
      "65s",
      "64s",
      "63s",
      "A5o",
      "K5o",
      "Q5o",
      "75o",
      "65o",
      "55",
      "54s",
      "53s",
      "52s",
      "A4o",
      "K4o",
      "Q4o",
      "54o",
      "44",
      "43s",
      "42s",
      "A3o",
      "K3o",
      "Q3o",
      "33",
      "A2o",
      "K2o",
      "Q2o",
      "22",
    ],
  },
];

// GAME TYPES
const GAME_TYPES = [
  "ALL",
  "LIVE CASH",
  "LIVE CASH 3-BET",
  "6-MAX CASH",
  "6-MAX CASH 3-BET",
  "20BB MTT OPEN",
  "20BB 3-BET JAM",
  "10BB PUSH/FOLD MTT",
];

// DOM references (range builder)
const grid = document.getElementById("grid");
const comboCountEl = document.getElementById("comboCount");
const rangePercentEl = document.getElementById("rangePercent");
const rangePercentTextEl = document.getElementById("rangePercentText");
const rangeBar = document.getElementById("rangeBar");
const gameTypeSelect = document.getElementById("gameTypeSelect");
const playerSelect = document.getElementById("playerSelect");
const situationSelect = document.getElementById("situationSelect");
const customSituationWrap = document.getElementById("customSituationWrap");
const customSituation = document.getElementById("customSituation");
const rangeSelect = document.getElementById("rangeSelect");
const assignmentStatus = document.getElementById("assignmentStatus");
const playerList = document.getElementById("playerList");
const templateList = document.getElementById("templateList");
const rangeListSummary = document.getElementById("rangeListSummary");
const storageStatus = document.getElementById("storageStatus");
const toast = document.getElementById("toast");

const range = new Set();
const gridCells = [];
const tempHighlight = new Set();
const lockedCells = new Set();
const GRID_BUFFER_PX = 8;

let state = loadState();
let isDragging = false;
let dragMode = null;
let shiftStartCell = null;
let activeMode = null;
let lastTouchedCell = null;
let lastIndex = null;
let toastTimer = null;

// ===== STATE & STORAGE =====
function defaultState() {
  return { version: 2, customTemplates: [], players: [], assignments: {} };
}

function loadState() {
  const fallback = defaultState();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);

    const customTemplates = Array.isArray(parsed.customTemplates)
      ? parsed.customTemplates
      : Array.isArray(parsed.templates)
        ? parsed.templates
        : [];

    return {
      version: 2,
      customTemplates: customTemplates.map((t, i) => ({
        id: t.id || `custom-${Date.now()}-${i}`,
        name: t.name || `Custom Template ${i + 1}`,
        description: t.description || "User-created range",
        gameType: t.gameType || "CUSTOM",
        hands: Array.isArray(t.hands) ? t.hands : [],
      })),
      players: Array.isArray(parsed.players) ? parsed.players : [],
      assignments:
        parsed.assignments && typeof parsed.assignments === "object"
          ? parsed.assignments
          : {},
    };
  } catch (error) {
    console.warn("Could not load saved tracker data.", error);
    return fallback;
  }
}

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    storageStatus.textContent = "Saved locally";
  } catch (error) {
    storageStatus.textContent = "Save failed";
    console.error(error);
  }
}

function notify(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}

// ===== RANGE MATH =====
function comboCount(hand) {
  if (hand.length === 2) return 6;
  return hand.endsWith("s") ? 4 : 12;
}

function updateCount() {
  let total = 0;
  range.forEach((hand) => (total += comboCount(hand)));
  const percent = Math.min(100, (total / TOTAL_COMBOS) * 100);
  comboCountEl.textContent = total;
  rangePercentTextEl.textContent = `${percent.toFixed(1)}%`;
  rangePercentEl.textContent = `${percent.toFixed(1)}% (${total} / ${TOTAL_COMBOS})`;
  rangeBar.style.width = `${percent}%`;
}

function clearRange() {
  range.clear();
  gridCells.flat().forEach((cell) => cell.classList.remove("active"));
  updateCount();
}

function loadHands(hands) {
  clearRange();
  (hands || []).forEach((hand) => {
    const cell = document.querySelector(
      `.cell[data-hand="${CSS.escape(hand)}"]`,
    );
    if (cell) {
      range.add(hand);
      cell.classList.add("active");
    }
  });
  updateCount();
}

// ===== GRID BUILDING & DRAG =====
function findCellIndex(cell) {
  for (let r = 0; r < gridCells.length; r++) {
    for (let c = 0; c < gridCells[r].length; c++) {
      if (gridCells[r][c] === cell) return { row: r, col: c };
    }
  }
  return null;
}

function applyCell(cell, mode) {
  const hand = cell.dataset.hand;
  if (mode === "add") {
    range.add(hand);
    cell.classList.add("active");
  } else if (mode === "remove") {
    range.delete(hand);
    cell.classList.remove("active");
  }
}

function clearTempHighlight() {
  tempHighlight.forEach((cell) =>
    cell.classList.remove("temp-highlight", "temp-erase"),
  );
  tempHighlight.clear();
}

function shiftHighlight(cell) {
  const index = findCellIndex(cell);
  if (!index) return;
  const hand = cell.dataset.hand;
  const type = hand.endsWith("o") ? "col" : hand.endsWith("s") ? "row" : "pair";

  if (
    !lastIndex ||
    lastIndex.type !== type ||
    (type === "col" && lastIndex.col !== index.col) ||
    (type === "row" && lastIndex.row !== index.row)
  ) {
    lockedCells.forEach((c) => applyCell(c, "add"));
    lockedCells.clear();
    lastIndex = { row: index.row, col: index.col, type };
  }

  clearTempHighlight();

  if (type === "col") {
    for (let r = 0; r <= index.row; r++) {
      const c = gridCells[r][index.col];
      tempHighlight.add(c);
      lockedCells.add(c);
      c.classList.add("temp-highlight");
    }
  } else if (type === "row") {
    for (let c = 0; c <= index.col; c++) {
      const target = gridCells[index.row][c];
      tempHighlight.add(target);
      lockedCells.add(target);
      target.classList.add("temp-highlight");
    }
  } else {
    tempHighlight.add(cell);
    lockedCells.add(cell);
    cell.classList.add("temp-highlight");
  }
}

function rectEraseHighlight(start, end) {
  clearTempHighlight();
  const a = findCellIndex(start);
  const b = findCellIndex(end);
  if (!a || !b) return;

  for (let r = Math.min(a.row, b.row); r <= Math.max(a.row, b.row); r++) {
    for (let c = Math.min(a.col, b.col); c <= Math.max(a.col, b.col); c++) {
      const cell = gridCells[r][c];
      if (cell.classList.contains("active")) {
        tempHighlight.add(cell);
        cell.classList.add("temp-erase");
      }
    }
  }
}

function commit() {
  if (dragMode === "shiftFill") {
    tempHighlight.forEach((c) => applyCell(c, "add"));
    lockedCells.forEach((c) => applyCell(c, "add"));
  }
  if (dragMode === "rectErase")
    tempHighlight.forEach((c) => applyCell(c, "remove"));
  updateCount();
  clearTempHighlight();
  lockedCells.clear();
  lastIndex = null;
}

function startDrag(cell, button, shift) {
  isDragging = true;
  shiftStartCell = cell;

  if (activeMode) dragMode = activeMode;
  else if (shift && button === 0) dragMode = "shiftFill";
  else if (shift && button === 2) dragMode = "rectErase";
  else if (button === 2) dragMode = "remove";
  else dragMode = "add";

  if (dragMode === "add" || dragMode === "remove") applyCell(cell, dragMode);
  if (dragMode === "shiftFill") shiftHighlight(cell);
  if (dragMode === "rectErase") rectEraseHighlight(cell, cell);
}

function moveDrag(cell) {
  if (!isDragging) return;
  if (dragMode === "add" || dragMode === "remove") applyCell(cell, dragMode);
  if (dragMode === "shiftFill") shiftHighlight(cell);
  if (dragMode === "rectErase") rectEraseHighlight(shiftStartCell, cell);
}

function endDrag() {
  if (!isDragging) return;
  commit();
  isDragging = false;
  dragMode = null;
  shiftStartCell = null;
}

function buildGrid() {
  ranks.forEach((r1, i) => {
    const row = [];
    ranks.forEach((r2, j) => {
      let hand, type;
      if (i === j) {
        hand = r1 + r2;
        type = "pair";
      } else if (i < j) {
        hand = r1 + r2 + "s";
        type = "suited";
      } else {
        hand = r2 + r1 + "o";
        type = "offsuit";
      }

      const cell = document.createElement("div");
      cell.className = `cell ${type}`;
      cell.textContent = hand;
      cell.dataset.hand = hand;

      cell.addEventListener("mousedown", (event) => {
        event.preventDefault();
        startDrag(cell, event.button, event.shiftKey);
      });
      cell.addEventListener("mouseenter", () => {
        if (isDragging) moveDrag(cell);
      });

      row.push(cell);
      grid.appendChild(cell);
    });
    gridCells.push(row);
  });
}

// ===== TEMPLATE & PLAYER MANAGEMENT =====
function allTemplates() {
  return [...PREMADE_TEMPLATES, ...state.customTemplates];
}

function templateById(id) {
  return allTemplates().find((template) => template.id === id) || null;
}

function isPremade(id) {
  return PREMADE_TEMPLATES.some((template) => template.id === id);
}

function gameTypeLabel(value) {
  return value === "ALL" ? "All Game Types" : value;
}

function situationKey() {
  let situation = situationSelect.value;
  if (situation === "Custom") situation = customSituation.value.trim();
  return situation ? `${playerSelect.value}::${situation}` : "";
}

function currentAssignedTemplate() {
  const key = situationKey();
  return key ? templateById(state.assignments[key]) : null;
}

function updateCustomSituationVisibility() {
  customSituationWrap.hidden = situationSelect.value !== "Custom";
}

function renderGameTypes() {
  const current = gameTypeSelect.value || "ALL";
  gameTypeSelect.innerHTML = "";
  GAME_TYPES.forEach((type) => {
    const option = document.createElement("option");
    option.value = type;
    option.textContent = gameTypeLabel(type);
    gameTypeSelect.appendChild(option);
  });
  gameTypeSelect.value = GAME_TYPES.includes(current) ? current : "ALL";
}

function filteredTemplates() {
  const selected = gameTypeSelect.value || "ALL";
  if (selected === "ALL") return allTemplates();
  return allTemplates().filter((template) => template.gameType === selected);
}

function renderRangeSelect(preferredId = null) {
  const templates = filteredTemplates();
  rangeSelect.innerHTML = "";

  const premade = templates.filter((t) => isPremade(t.id));
  const custom = templates.filter((t) => !isPremade(t.id));

  if (premade.length) {
    const group = document.createElement("optgroup");
    group.label = "Premade ranges";
    premade.forEach((template) => addTemplateOption(group, template));
    rangeSelect.appendChild(group);
  }

  if (custom.length) {
    const group = document.createElement("optgroup");
    group.label = "My templates";
    custom.forEach((template) => addTemplateOption(group, template));
    rangeSelect.appendChild(group);
  }

  if (!rangeSelect.options.length) {
    const option = document.createElement("option");
    option.value = "";
    option.textContent = "No ranges for this game type";
    rangeSelect.appendChild(option);
  }

  if (
    preferredId &&
    [...rangeSelect.options].some((o) => o.value === preferredId)
  ) {
    rangeSelect.value = preferredId;
  }
}

function addTemplateOption(group, template) {
  const option = document.createElement("option");
  option.value = template.id;
  option.textContent = template.name;
  group.appendChild(option);
}

function renderPlayers(preferredPlayerId = null) {
  const selectedId = preferredPlayerId || playerSelect.value;
  playerSelect.innerHTML = "";

  if (!state.players.length) {
    const option = document.createElement("option");
    option.value = "";
    option.textContent = "No players yet";
    playerSelect.appendChild(option);
  } else {
    state.players.forEach((player) => {
      const option = document.createElement("option");
      option.value = player.id;
      option.textContent = player.name;
      playerSelect.appendChild(option);
    });
  }

  playerList.innerHTML = "";
  state.players.forEach((player) => {
    const item = document.createElement("button");
    item.type = "button";
    item.className =
      "player-item" + (player.id === playerSelect.value ? " selected" : "");
    item.dataset.playerId = player.id;

    const assignments = Object.entries(state.assignments)
      .filter(([key]) => key.startsWith(`${player.id}::`))
      .map(([, templateId]) => templateById(templateId))
      .filter(Boolean);

    item.innerHTML = `<strong>${escapeHtml(player.name)}</strong><span>${assignments.length} assigned range${assignments.length === 1 ? "" : "s"}</span>`;
    item.addEventListener("click", () => {
      playerSelect.value = player.id;
      updateAssignment();
    });
    playerList.appendChild(item);
  });

  if (state.players.length) {
    const selectedExists = state.players.some((p) => p.id === selectedId);
    playerSelect.value = selectedExists ? selectedId : state.players[0].id;

    playerList.querySelectorAll(".player-item").forEach((item) => {
      item.classList.toggle(
        "selected",
        item.dataset.playerId === playerSelect.value,
      );
    });
  }
}

function renderTemplateList() {
  const templates = filteredTemplates();
  rangeListSummary.textContent = `${templates.length} range${templates.length === 1 ? "" : "s"} shown for ${gameTypeLabel(gameTypeSelect.value)}.`;

  templateList.innerHTML = "";
  templates.forEach((template) => {
    const item = document.createElement("div");
    item.className = "template-item";

    const badge = isPremade(template.id) ? "Premade" : "Mine";
    item.innerHTML = `
      <div class="template-item-top">
        <strong>${escapeHtml(template.name)}</strong>
        <span class="badge ${isPremade(template.id) ? "premade" : "mine"}">${badge}</span>
      </div>
      <span>${escapeHtml(template.gameType)}</span>
    `;

    const actions = document.createElement("div");
    actions.className = "template-item-actions";
    const load = document.createElement("button");
    load.type = "button";
    load.textContent = "Load";
    load.addEventListener("click", () => {
      rangeSelect.value = template.id;
      loadTemplate(template.id);
    });
    actions.appendChild(load);
    item.appendChild(actions);
    templateList.appendChild(item);
  });
}

function updateAssignment() {
  updateCustomSituationVisibility();
  const assigned = currentAssignedTemplate();

  if (!playerSelect.value) {
    assignmentStatus.textContent = "Add a player to assign an expected range.";
    assignmentStatus.className = "assignment-status";
    renderPlayers();
    return;
  }

  if (!situationKey()) {
    assignmentStatus.textContent =
      "Enter a custom situation before assigning a range.";
    assignmentStatus.className = "assignment-status warning";
    renderPlayers();
    return;
  }

  if (assigned) {
    const templateGame = assigned.gameType;
    if (
      templateGame &&
      GAME_TYPES.includes(templateGame) &&
      gameTypeSelect.value !== templateGame
    ) {
      gameTypeSelect.value = templateGame;
      renderRangeSelect(assigned.id);
      renderTemplateList();
    } else if ([...rangeSelect.options].some((o) => o.value === assigned.id)) {
      rangeSelect.value = assigned.id;
    }

    assignmentStatus.textContent = `Expected range: ${assigned.name}`;
    assignmentStatus.className = "assignment-status assigned";
  } else {
    assignmentStatus.textContent =
      "No expected range assigned for this player/situation.";
    assignmentStatus.className = "assignment-status";
  }

  renderPlayers();
}

function loadTemplate(id) {
  const template = templateById(id);
  if (!template) {
    notify("Range not found.");
    return;
  }
  loadHands(template.hands);
  rangeSelect.value = template.id;
  notify(`Loaded ${template.name}`);
}

function assignTemplate() {
  const template = templateById(rangeSelect.value);
  if (!template) {
    notify("Choose a range first.");
    return;
  }
  if (!playerSelect.value) {
    notify("Add/select a player first.");
    return;
  }
  const key = situationKey();
  if (!key) {
    notify("Choose a situation first.");
    return;
  }

  state.assignments[key] = template.id;
  persist();
  updateAssignment();
  notify(`Assigned ${template.name}`);
}

function saveCurrentAsTemplate() {
  const name = prompt("Template name:");
  if (!name || !name.trim()) return;

  const cleanName = name.trim();
  if (
    allTemplates().some((t) => t.name.toLowerCase() === cleanName.toLowerCase())
  ) {
    notify("A template with that name already exists.");
    return;
  }

  const description =
    prompt("Optional description:", "User-created range") ||
    "User-created range";
  const gameType =
    gameTypeSelect.value === "ALL" ? "CUSTOM" : gameTypeSelect.value;
  const id = `custom-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

  state.customTemplates.push({
    id,
    name: cleanName,
    description: description.trim(),
    gameType,
    hands: [...range],
  });

  persist();
  renderRangeSelect(id);
  renderTemplateList();
  rangeSelect.value = id;
  notify(`Saved ${cleanName}`);
}

function updateMyTemplate() {
  const id = rangeSelect.value;
  const template = state.customTemplates.find((t) => t.id === id);
  if (!template) {
    notify("Select one of your templates first.");
    return;
  }

  template.hands = [...range];
  persist();
  renderRangeSelect(id);
  renderTemplateList();
  notify(`Updated ${template.name}`);
}

function deleteMyTemplate() {
  const id = rangeSelect.value;
  const template = state.customTemplates.find((t) => t.id === id);
  if (!template) {
    notify("Premade ranges cannot be deleted. Select one of your templates.");
    return;
  }

  if (!confirm(`Delete "${template.name}"?`)) return;

  state.customTemplates = state.customTemplates.filter((t) => t.id !== id);
  Object.keys(state.assignments).forEach((key) => {
    if (state.assignments[key] === id) delete state.assignments[key];
  });

  persist();
  renderRangeSelect();
  renderTemplateList();
  updateAssignment();
  notify("Template deleted.");
}

function addPlayer() {
  const input = document.getElementById("newPlayerName");
  const name = input.value.trim();

  if (!name) {
    notify("Enter a player name.");
    return;
  }
  if (state.players.some((p) => p.name.toLowerCase() === name.toLowerCase())) {
    notify("That player already exists.");
    return;
  }

  const id = `player-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  state.players.push({ id, name });
  input.value = "";
  playerSelect.value = id;
  persist();
  renderPlayers();
  updateAssignment();
  notify(`Added ${name}`);
}

function deleteSelectedPlayer() {
  const id = playerSelect.value;
  const player = state.players.find((p) => p.id === id);

  if (!player) {
    notify("Select a player first.");
    return;
  }

  if (!confirm(`Delete player "${player.name}" and their assignments?`)) return;

  state.players = state.players.filter((p) => p.id !== id);
  Object.keys(state.assignments).forEach((key) => {
    if (key.startsWith(`${id}::`)) delete state.assignments[key];
  });

  persist();
  renderPlayers();
  updateAssignment();
  notify("Player deleted.");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// ===== INITIAL RANGE BUILDER SETUP =====
buildGrid();
renderGameTypes();
renderPlayers();
renderRangeSelect(PREMADE_TEMPLATES[0]?.id);
renderTemplateList();
updateCustomSituationVisibility();
updateAssignment();
updateCount();

// Buttons & events (range builder)
document
  .getElementById("btnLoadRange")
  .addEventListener("click", () => loadTemplate(rangeSelect.value));
document.getElementById("btnAssign").addEventListener("click", assignTemplate);
document
  .getElementById("btnSaveTemplate")
  .addEventListener("click", saveCurrentAsTemplate);
document
  .getElementById("btnUpdateTemplate")
  .addEventListener("click", updateMyTemplate);
document
  .getElementById("btnDeleteTemplate")
  .addEventListener("click", deleteMyTemplate);
document.getElementById("btnAddPlayer").addEventListener("click", addPlayer);
document
  .getElementById("btnDeletePlayer")
  .addEventListener("click", deleteSelectedPlayer);

gameTypeSelect.addEventListener("change", () => {
  renderRangeSelect();
  renderTemplateList();
  const assigned = currentAssignedTemplate();
  if (assigned && assigned.gameType === gameTypeSelect.value)
    rangeSelect.value = assigned.id;
});

playerSelect.addEventListener("change", updateAssignment);
situationSelect.addEventListener("change", updateAssignment);
customSituation.addEventListener("input", updateAssignment);

rangeSelect.addEventListener("change", () => {
  const template = templateById(rangeSelect.value);
  if (!template) return;
  loadTemplate(template.id);
});

const controlButtons = document.querySelectorAll("#controls button");
controlButtons.forEach((button) => {
  const chooseMode = () => {
    const mode = button.dataset.mode;
    if (activeMode === mode) {
      activeMode = null;
      button.classList.remove("active");
    } else {
      activeMode = mode;
      controlButtons.forEach((b) => b.classList.remove("active"));
      button.classList.add("active");
    }
  };
  button.addEventListener("click", chooseMode);
  button.addEventListener("touchend", (event) => {
    event.preventDefault();
    chooseMode();
  });
});

grid.addEventListener("contextmenu", (event) => {
  if (isDragging) event.preventDefault();
});

grid.addEventListener(
  "touchstart",
  (event) => {
    if (event.touches.length !== 1) return;
    const touch = event.touches[0];
    const element = document.elementFromPoint(touch.clientX, touch.clientY);
    const cell = element?.closest(".cell");
    if (!cell) return;
    event.preventDefault();
    startDrag(cell, 0, false);
    lastTouchedCell = cell;
  },
  { passive: false },
);

grid.addEventListener(
  "touchmove",
  (event) => {
    if (!isDragging) return;
    const touch = event.touches[0];
    const element = document.elementFromPoint(touch.clientX, touch.clientY);
    const cell = element?.closest(".cell");
    if (!cell || cell === lastTouchedCell) return;
    event.preventDefault();
    moveDrag(cell);
    lastTouchedCell = cell;
  },
  { passive: false },
);

grid.addEventListener(
  "touchend",
  (event) => {
    event.preventDefault();
    endDrag();
    lastTouchedCell = null;
  },
  { passive: false },
);

document.addEventListener("mouseup", endDrag);
document.addEventListener("contextmenu", (event) => {
  const rect = grid.getBoundingClientRect();
  const inside =
    event.clientX >= rect.left - GRID_BUFFER_PX &&
    event.clientX <= rect.right + GRID_BUFFER_PX &&
    event.clientY >= rect.top - GRID_BUFFER_PX &&
    event.clientY <= rect.bottom + GRID_BUFFER_PX;
  if (inside) event.preventDefault();
});

// ===== TABS (REPLACE CONTENT) =====
const tabButtons = document.querySelectorAll(".tab-button");
const tabContents = document.querySelectorAll(".tab-content");

tabButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const target = btn.dataset.tab;
    tabButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    tabContents.forEach((content) => {
      content.classList.toggle("active", content.id === target);
    });
  });
});

// ===== QUIZ TRAINER =====
const quizHandEl = document.getElementById("quizHand");
const quizResultEl = document.getElementById("quizResult");
const quizCountEl = document.getElementById("quizCount");
const quizCorrectEl = document.getElementById("quizCorrect");
const quizAccuracyEl = document.getElementById("quizAccuracy");

let quizCurrentHand = null;
let quizCount = 0;
let quizCorrect = 0;

function randomHand() {
  const r1 = ranks[Math.floor(Math.random() * ranks.length)];
  const r2 = ranks[Math.floor(Math.random() * ranks.length)];
  if (r1 === r2) return r1 + r2;
  const suited = Math.random() < 0.5;
  return r1 + r2 + (suited ? "s" : "o");
}

function quizUpdateStats() {
  quizCountEl.textContent = quizCount;
  quizCorrectEl.textContent = quizCorrect;
  const acc = quizCount ? (quizCorrect / quizCount) * 100 : 0;
  quizAccuracyEl.textContent = `${acc.toFixed(1)}%`;
}

function quizNext() {
  quizCurrentHand = randomHand();
  quizHandEl.textContent = quizCurrentHand;
  quizResultEl.textContent = "";
}

document.getElementById("quizStart").addEventListener("click", () => {
  quizCount = 0;
  quizCorrect = 0;
  quizUpdateStats();
  quizNext();
});

document.getElementById("quizNext").addEventListener("click", quizNext);

document.getElementById("quizInRange").addEventListener("click", () => {
  if (!quizCurrentHand) return;
  quizCount++;
  const inRange = range.has(quizCurrentHand);
  if (inRange) {
    quizCorrect++;
    quizResultEl.textContent = "Correct: hand is in the current range.";
  } else {
    quizResultEl.textContent = "Incorrect: hand is NOT in the current range.";
  }
  quizUpdateStats();
});

document.getElementById("quizNotInRange").addEventListener("click", () => {
  if (!quizCurrentHand) return;
  quizCount++;
  const inRange = range.has(quizCurrentHand);
  if (!inRange) {
    quizCorrect++;
    quizResultEl.textContent = "Correct: hand is not in the current range.";
  } else {
    quizResultEl.textContent = "Incorrect: hand IS in the current range.";
  }
  quizUpdateStats();
});

// ===== HAND REVIEW =====
const seatCountSelect = document.getElementById("seatCount");
const tableEl = document.getElementById("table");
const seatDetailEl = document.getElementById("seatDetail");
const boardFlopEl = document.getElementById("boardFlop");
const boardTurnEl = document.getElementById("boardTurn");
const boardRiverEl = document.getElementById("boardRiver");

let seats = [];
let dealerIndex = 0;
let selectedSeatIndex = null;

function initSeats(count) {
  seats = [];
  for (let i = 0; i < count; i++) {
    seats.push({
      seatNumber: i + 1,
      isDealer: i === dealerIndex,
      startingStack: 100,
      currentStack: 100,
      holeCards: null,
      actions: [],
      assignedRangeId: null,
    });
  }
}

function renderTable() {
  tableEl.innerHTML = "";
  const count = seats.length;
  const radius = 150;

  seats.forEach((seat, index) => {
    const angle = (2 * Math.PI * index) / count - Math.PI / 2;
    const centerX = 180 + radius * Math.cos(angle);
    const centerY = 180 + radius * Math.sin(angle);

    const seatEl = document.createElement("div");
    seatEl.className = "seat";
    if (index === selectedSeatIndex) seatEl.classList.add("selected");
    seatEl.style.left = `${centerX - 45}px`;
    seatEl.style.top = `${centerY - 35}px`;

    const header = document.createElement("div");
    header.className = "seat-header";
    header.innerHTML = `<span>Seat ${seat.seatNumber}</span>${
      seat.isDealer ? '<span class="seat-dealer">Dealer</span>' : ""
    }`;

    const stack = document.createElement("div");
    stack.textContent = `Stack: ${seat.currentStack}`;

    const hole = document.createElement("div");
    hole.textContent = `Hole: ${
      seat.holeCards ? seat.holeCards.join(" ") : "— —"
    }`;

    const actions = document.createElement("div");
    actions.className = "seat-actions";
    actions.textContent =
      seat.actions.length > 0
        ? `Actions: ${seat.actions.join(", ")}`
        : "Actions: —";

    seatEl.appendChild(header);
    seatEl.appendChild(stack);
    seatEl.appendChild(hole);
    seatEl.appendChild(actions);

    seatEl.addEventListener("click", () => {
      selectedSeatIndex = index;
      renderTable();
      renderSeatDetail();
    });

    tableEl.appendChild(seatEl);
  });
}

function renderSeatDetail() {
  if (selectedSeatIndex == null) {
    seatDetailEl.innerHTML =
      "<p>Select a seat to edit stack, cards, and actions.</p>";
    return;
  }

  const seat = seats[selectedSeatIndex];
  seatDetailEl.innerHTML = "";

  const title = document.createElement("h3");
  title.textContent = `Seat ${seat.seatNumber} Details`;
  seatDetailEl.appendChild(title);

  // Dealer toggle
  const dealerRow = document.createElement("div");
  dealerRow.className = "seat-detail-row";
  const dealerLabel = document.createElement("label");
  dealerLabel.textContent = "Dealer";
  const dealerButton = document.createElement("button");
  dealerButton.textContent = seat.isDealer ? "Unset Dealer" : "Set Dealer";
  dealerButton.addEventListener("click", () => {
    seats.forEach((s) => (s.isDealer = false));
    seat.isDealer = true;
    dealerIndex = selectedSeatIndex;
    renderTable();
    renderSeatDetail();
  });
  dealerRow.appendChild(dealerLabel);
  dealerRow.appendChild(dealerButton);
  seatDetailEl.appendChild(dealerRow);

  // Starting stack
  const startRow = document.createElement("div");
  startRow.className = "seat-detail-row";
  const startLabel = document.createElement("label");
  startLabel.textContent = "Starting Stack";
  const startInput = document.createElement("input");
  startInput.type = "number";
  startInput.value = seat.startingStack;
  startInput.addEventListener("change", () => {
    const val = Number(startInput.value) || 0;
    seat.startingStack = val;
    if (seat.actions.length === 0) {
      seat.currentStack = val;
    }
    renderTable();
  });
  startRow.appendChild(startLabel);
  startRow.appendChild(startInput);
  seatDetailEl.appendChild(startRow);

  // Current stack (read-only)
  const currentRow = document.createElement("div");
  currentRow.className = "seat-detail-row";
  const currentLabel = document.createElement("label");
  currentLabel.textContent = "Current Stack";
  const currentDisplay = document.createElement("div");
  currentDisplay.textContent = seat.currentStack;
  currentRow.appendChild(currentLabel);
  currentRow.appendChild(currentDisplay);
  seatDetailEl.appendChild(currentRow);

  // Bet amount
  const betRow = document.createElement("div");
  betRow.className = "seat-detail-row";
  const betLabel = document.createElement("label");
  betLabel.textContent = "Bet / Call / Raise Amount";
  const betInput = document.createElement("input");
  betInput.type = "number";
  betInput.value = 0;
  betRow.appendChild(betLabel);
  betRow.appendChild(betInput);
  seatDetailEl.appendChild(betRow);

  // Hole cards manual entry (optional)
  const holeRow = document.createElement("div");
  holeRow.className = "seat-detail-row";
  const holeLabel = document.createElement("label");
  holeLabel.textContent = "Hole Cards (e.g. As Kd)";
  const holeInput = document.createElement("input");
  holeInput.type = "text";
  holeInput.value = seat.holeCards ? seat.holeCards.join(" ") : "";
  holeInput.addEventListener("change", () => {
    const parts = holeInput.value.trim().split(/\s+/);
    seat.holeCards = parts.length >= 2 ? parts.slice(0, 2) : null;
    renderTable();
  });
  holeRow.appendChild(holeLabel);
  holeRow.appendChild(holeInput);
  seatDetailEl.appendChild(holeRow);

  // Actions
  const actionsRow = document.createElement("div");
  actionsRow.className = "seat-detail-actions";

  const foldBtn = document.createElement("button");
  foldBtn.textContent = "Fold";
  foldBtn.classList.add("fold");
  foldBtn.addEventListener("click", () => {
    seat.actions.push("Fold");
    renderTable();
    renderSeatDetail();
  });

  const checkBtn = document.createElement("button");
  checkBtn.textContent = "Check";
  checkBtn.classList.add("check");
  checkBtn.addEventListener("click", () => {
    seat.actions.push("Check");
    renderTable();
    renderSeatDetail();
  });

  const callBtn = document.createElement("button");
  callBtn.textContent = "Call";
  callBtn.classList.add("call");
  callBtn.addEventListener("click", () => {
    const amt = Number(betInput.value) || 0;
    seat.currentStack = Math.max(0, seat.currentStack - amt);
    seat.actions.push(`Call ${amt}`);
    renderTable();
    renderSeatDetail();
  });

  const betBtn = document.createElement("button");
  betBtn.textContent = "Bet";
  betBtn.classList.add("bet");
  betBtn.addEventListener("click", () => {
    const amt = Number(betInput.value) || 0;
    seat.currentStack = Math.max(0, seat.currentStack - amt);
    seat.actions.push(`Bet ${amt}`);
    renderTable();
    renderSeatDetail();
  });

  const raiseBtn = document.createElement("button");
  raiseBtn.textContent = "Raise";
  raiseBtn.classList.add("raise");
  raiseBtn.addEventListener("click", () => {
    const amt = Number(betInput.value) || 0;
    seat.currentStack = Math.max(0, seat.currentStack - amt);
    seat.actions.push(`Raise ${amt}`);
    renderTable();
    renderSeatDetail();
  });

  actionsRow.appendChild(foldBtn);
  actionsRow.appendChild(checkBtn);
  actionsRow.appendChild(callBtn);
  actionsRow.appendChild(betBtn);
  actionsRow.appendChild(raiseBtn);

  seatDetailEl.appendChild(actionsRow);

  // Action history
  const historyRow = document.createElement("div");
  historyRow.className = "seat-detail-row";
  const historyLabel = document.createElement("label");
  historyLabel.textContent = "Action History";
  const historyDisplay = document.createElement("div");
  historyDisplay.textContent =
    seat.actions.length > 0 ? seat.actions.join(", ") : "—";
  historyRow.appendChild(historyLabel);
  historyRow.appendChild(historyDisplay);
  seatDetailEl.appendChild(historyRow);
}

// Board dealing (simple random cards)
const suits = ["♠", "♥", "♦", "♣"];
const ranksCards = [
  "A",
  "K",
  "Q",
  "J",
  "T",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2",
];

function randomCard(exclude = new Set()) {
  while (true) {
    const r = ranksCards[Math.floor(Math.random() * ranksCards.length)];
    const s = suits[Math.floor(Math.random() * suits.length)];
    const card = r + s;
    if (!exclude.has(card)) {
      exclude.add(card);
      return card;
    }
  }
}

let dealtCards = new Set();

function dealHoleCards() {
  dealtCards = new Set();
  seats.forEach((seat) => {
    const c1 = randomCard(dealtCards);
    const c2 = randomCard(dealtCards);
    seat.holeCards = [c1, c2];
  });
  renderTable();
  renderSeatDetail();
}

function dealFlop() {
  const c1 = randomCard(dealtCards);
  const c2 = randomCard(dealtCards);
  const c3 = randomCard(dealtCards);
  boardFlopEl.textContent = `${c1} ${c2} ${c3}`;
}

function dealTurn() {
  const c = randomCard(dealtCards);
  boardTurnEl.textContent = c;
}

function dealRiver() {
  const c = randomCard(dealtCards);
  boardRiverEl.textContent = c;
}

function resetBoard() {
  dealtCards = new Set();
  boardFlopEl.textContent = "— — —";
  boardTurnEl.textContent = "—";
  boardRiverEl.textContent = "—";
}

function autoRotateDealer() {
  dealerIndex = (dealerIndex + 1) % seats.length;
  seats.forEach((s, i) => (s.isDealer = i === dealerIndex));
}

// Hand reset: auto rotate dealer, reset stacks to starting, clear actions
function resetHand() {
  autoRotateDealer();
  seats.forEach((seat) => {
    seat.currentStack = seat.startingStack;
    seat.actions = [];
    seat.holeCards = null;
  });
  resetBoard();
  renderTable();
  renderSeatDetail();
}

// Hand review events
seatCountSelect.addEventListener("change", () => {
  const count = Number(seatCountSelect.value);
  dealerIndex = 0;
  selectedSeatIndex = null;
  initSeats(count);
  resetBoard();
  renderTable();
  renderSeatDetail();
});

document.getElementById("btnDealHole").addEventListener("click", dealHoleCards);
document.getElementById("btnDealFlop").addEventListener("click", dealFlop);
document.getElementById("btnDealTurn").addEventListener("click", dealTurn);
document.getElementById("btnDealRiver").addEventListener("click", dealRiver);
document.getElementById("btnResetHand").addEventListener("click", resetHand);

// Initial hand review setup
initSeats(Number(seatCountSelect.value));
renderTable();
renderSeatDetail();
resetBoard();
