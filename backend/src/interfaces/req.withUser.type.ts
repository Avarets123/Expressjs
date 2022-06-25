import { Request } from "express";

export type TypeReqExpWithUser = Request & { user: any };