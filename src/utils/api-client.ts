import { useMutation, useQuery } from "@tanstack/react-query";
import { FullReport } from "../components/report/report";
import { BaseClient } from "./api-base";

const apiClient = new BaseClient("http://178.63.13.157:8090/mock-api/api");

export interface UserData {
  email: string;
  firstName: string;
  lastName: string;
  userId: string;
}

export const useGetUsers = () => {
  return useQuery(["get-users"], async () => {
    const res = await apiClient.get<{ code: string; data: UserData[] }>(
      "/users"
    );
    return res.data;
  });
};

export interface ProjectData {
  description: string;
  gatewayIds: string[];
  image: string;
  industry: string;
  name: string;
  projectId: string;
  rule: string;
  structure: string;
  userIds: string[];
  website: string;
}

export const useGetProjects = () => {
  return useQuery(["get-projects"], async () => {
    try {
      const res = await apiClient.get<{ code: string; data: ProjectData[], error?: string  }>(
        "/projects"
      );

      if(res.code != '200'){
        throw Error(res.error)
      }

      return res.data;
    } catch (err: unknown) {
      throw Error((err as Error).message);
    }
  });
};

export interface GateawayData {
  apiKey: string;
  description: string;
  gatewayId: string;
  name: string;
  secondaryApiKey: string;
  type: string;
  userIds: string[];
}

export const useGetGateways = () => {
  return useQuery(["get-gateways"], async () => {
    try {
      const res = await apiClient.get<{ code: string; data: GateawayData[],error?: string }>(
        "/gateways"
      );

      if(res.code != '200'){
        throw Error(res.error)
      }

      return res.data;
    } catch (err: unknown) {
      throw Error((err as Error).message);
    }
  });
};

export interface ReportParams {
  projectId?: string;
  gatewayId?: string;
  from: string;
  to: string;
}

export interface ReportItem {
  amount: number;
  created: string;
  gatewayId: string;
  modified: string;
  paymentId: string;
  projectId: string;
  userIds: string[];
}

export const useGenerateReport = (
  filters: ReportParams,
  projects: ProjectData[] | undefined,
  gateways: GateawayData[] | undefined
) => {
  return useMutation(async (params: ReportParams) => {
    try {
      const res = await apiClient.post<{ code: string; data: ReportItem[], error?: string }>(
        "/report",
        {
          body: JSON.stringify(params),
        }
      );

      if(res.code != '200'){
        throw Error(res.error)
      }

      return {
        params: filters,
        data: res.data,
        projects: projects!,
        gateways: gateways!,
      } satisfies FullReport;

    } catch (err: unknown) {
      throw Error((err as Error).message);
    }
  });
};
