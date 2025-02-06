import { Response } from "express";

interface ApiResponse<T> {
  status: "success" | "error";
  message: string;
  data?: T;
  error?: any;
}

export const sendSuccessResponse = <T>(
  res: Response,
  data: T,
  message: string = "Request was successful"
): Response<ApiResponse<T>> => {
  return res.status(200).json({
    status: "success",
    message,
    data,
  });
};

export const sendErrorResponse = (
  res: Response,
  error: any,
  message: string = "Something went wrong"
): Response<ApiResponse<null>> => {
  return res.status(500).json({
    status: "error",
    message,
    error,
  });
};

export const notFound = (
  res: Response,
  message: string = "Resource not found"
): Response<ApiResponse<null>> => {
  return res.status(404).json({
    status: "error",
    message,
  });
};

export const badRequest = (
  res: Response,
  message: string = "Bad request"
): Response<ApiResponse<null>> => {
  return res.status(400).json({
    status: "error",
    message,
  });
};

export const unauthorized = (
  res: Response,
  message: string = "Unauthorized"
): Response<ApiResponse<null>> => {
  return res.status(401).json({
    status: "error",
    message,
  });
};
