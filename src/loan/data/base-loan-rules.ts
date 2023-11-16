import { PersonScoreRange, TimeRange37UpTo48, TimeRange49UpTo60, TimeRangeUpTo36 } from "../entities/apr.entities";

export default function getBaseLoanRules() {
    return [
      new PersonScoreRange(undefined, 600, 50000, [
        TimeRangeUpTo36(12.75),
        TimeRange37UpTo48(13.25),
        TimeRange49UpTo60(undefined),
      ]),
      new PersonScoreRange(599, 700, 75000, [
        TimeRangeUpTo36(5.75),
        TimeRange37UpTo48(6.0),
        TimeRange49UpTo60(6.65),
      ]),
      new PersonScoreRange(699, undefined, 100000, [
        TimeRangeUpTo36(4.75),
        TimeRange37UpTo48(5.0),
        TimeRange49UpTo60(5.5),
      ]),
    ];
  }
  