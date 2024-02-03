export enum DataType {
  Issue = 'Issue',
  Comment = 'Comment',
  Project = 'Project'
}

export type UserType = {
  id: string,
  name: string,
}

export type State = {
  id: string,
  color: string,
  name: string,
  type: string
}

export type Team = {
  id: string,
  key: string,
  name: string
}

export type IssueContent = {
  entity: string,
  title: string,
  assignee?: string,
  team: string,
  state: string,
  action: string,
  date: string,
  labels: Object[]
}

export type IssueData = {
  id: string,
  createdAt: string,
  updatedAt: string,
  number: number,
  title: string,
  priority: number,
  boardOrder: number,
  sortOrder: number,
  startedAt: string,
  labelIds: string[],
  teamId: string,
  assigneeId: string,
  stateId: string,
  priorityLabel: string,
  identifier: string,
  url: string,
  assignee: UserType,
  labels: Object[],
  state: State,
  team: Team,
  subscriberIds: string[],
  description: string,
  descriptionData: string
}

export type CommentContent = {
  entity: string,
  body: string,
  user: string,
  issue: string,
  date: string,
  action: string
}

export type CommentData = {
  id: string,
  createdAt: string,
  updatedAt: string,
  body: string,
  issueId: string,
  userId: string,
  reactionData: Object[],
  user: UserType,
  issue: IssueData
}