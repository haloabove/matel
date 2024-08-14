export interface ListItem {
  userName: string;
  address: string;
}

export interface LogData {
    ipAddress: string;
    timestamp: string;
    method: string;
    request: string;
    statusCode: number;
    userAgent: string;
}

interface UserData {
    userName: string;
    address: string;
}

export interface ListClient {
  fetchList: (user: string) => Promise<[]>;
  fetchLocalData: () => Promise<UserData[]>;
  loadFile: () => Promise<LogData[] | null>;
}

export interface RootState {
  listItems: ListItem[];
}

export interface GettersRootState {
  listItems: ListItem[];
}