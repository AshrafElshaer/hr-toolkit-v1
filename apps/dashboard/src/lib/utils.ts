export function formatBytes(
    bytes: number,
    opts: {
      decimals?: number;
      sizeType?: "accurate" | "normal";
    } = {},
  ) {
    const { decimals = 0, sizeType = "normal" } = opts;
  
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const accurateSizes = ["Bytes", "KiB", "MiB", "GiB", "TiB"];
    if (bytes === 0) return "0 Byte";
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / 1024 ** i).toFixed(decimals)} ${
      sizeType === "accurate" ? accurateSizes[i] ?? "Bytes" : sizes[i] ?? "Bytes"
    }`;
  }
  
  export function getSegmentAfterDocuments(pathname: string) {
    const pathSegments = pathname.split("/");
    const documentsIndex = pathSegments.indexOf("documents");
    return documentsIndex !== -1 && documentsIndex + 1 < pathSegments.length
      ? pathSegments.slice(documentsIndex + 1).join("/")
      : "";
  }
  
  export async function wait(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }