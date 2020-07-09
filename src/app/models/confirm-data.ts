export interface ConfirmData {
  approver: string;
  resolution: string;
  comment: string;
  state: State;
}

export enum State {
  'reject',
  'approve'
}
