import { ListClient, LogData } from './../models/index';
import axios  from 'axios';
import { parseLogData } from './fromDomain';

const schemesClient: (baseURL: string) => ListClient = (baseURL: string) => {
    const client = axios.create({ baseURL });

    return {
        fetchList: (user) =>
            client.get(
            `/`,
            {
                params: { user },
            },
        ),
        fetchLocalData: () => {
            return new Promise((resolve) => {
                setTimeout(()=>{ resolve([{
                    userName : '',
                    address : ''
                }]);}, 1000)
            })
        },
        async loadFile(): Promise<LogData[] | null> {
            try {
                // Fetch the file content as string
                const response = await fetch('/programming-task-example-data.log');
                const data = await response.text();
            
                // Parse the log data using your parseLogData function
                const parsedData = parseLogData(data);
                
                return parsedData;
            } catch (error) {
                console.error('Failed to load or parse the file:', error);

                return null;
            }
        }
    }
};

export default schemesClient;