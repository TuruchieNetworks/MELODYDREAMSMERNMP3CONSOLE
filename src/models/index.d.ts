import { ModelInit, MutableModel } from "@aws-amplify/datastore";

type MusiciansMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Musicians {
  readonly id: string;
  readonly username?: string | null;
  readonly tracks?: string | null;
  readonly likes?: number | null;
  readonly image?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Musicians, MusiciansMetaData>);
  static copyOf(source: Musicians, mutator: (draft: MutableModel<Musicians, MusiciansMetaData>) => MutableModel<Musicians, MusiciansMetaData> | void): Musicians;
}