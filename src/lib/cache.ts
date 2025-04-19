import { unstable_cache as nextCache } from "next/cache";
import { cache as reactCache } from "react";

type CallBack = (...args: any[])=> Promise<any>;
export function cache<T extends CallBack>(
  callback: T,
  keyParts: string[],
  options: {
    revalidate?: number | false;
    tags?: string[];
  }) {
    return nextCache(reactCache(callback), keyParts, options);
}